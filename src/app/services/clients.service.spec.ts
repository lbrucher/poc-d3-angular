import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ClientsService, ClientRaw } from './clients.service';
import { Client } from '../models/client';
import { environment } from '../environnements/environnement';
import { Account } from '../models/account';
import { CardType } from '../models/card-type';
import { ClientsData } from '../models/clients-data';

class TestClient implements ClientRaw {
  id: string;
  name: string;
  firstname: string | null;
  address: string | null;
  created: string;
  birthday: string;
  accounts: string[];

  constructor(id: string, name: string, firstname:string|null, address:string|null, created:string, birthday:string, accounts:string[]) {
    this.id = id;
    this.name = name;
    this.firstname = firstname;
    this.address = address;
    this.created = created;
    this.birthday = birthday;
    this.accounts = accounts;
  }
}

const cardTypes: CardType[] = [
  new CardType('VISA', '#024C8C'),
  new CardType('MasterCard', '#F0991B'),
  new CardType('American Express', '#9BCAA7')
];

describe('ClientsService', () => {
  let httpTestingController: HttpTestingController;
  let service: ClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });

    service = TestBed.inject(ClientsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should get clients and their account info', () => {
    const serverAccounts: Account[] = [
      new Account('1', 'VISA', 100, 1000, '2024-01-01 10:00:00'),
      new Account('2', 'MasterCard', 101, -200, '2024-01-02 10:00:00')
    ];

    const serverClients: ClientRaw[] = [
      new TestClient('C1', 'Client1', 'Test1', 'client1 address', '2024-01-01', '1990-01-01', ['1']),
      new TestClient('C2', 'Client2', 'Test2', 'client2 address', '2024-01-02', '1991-01-01', ['2']),
      new TestClient('C3', 'Client3', 'Test3', 'client3 address', '2024-01-03', '1992-01-01', ['1', '2']),
    ];

    const expectedClients: Client[] = [
      new Client('C1', 'Client1', 'Test1', 'client1 address', '2024-01-01', '1990-01-01', [serverAccounts[0]]),
      new Client('C2', 'Client2', 'Test2', 'client2 address', '2024-01-02', '1991-01-01', [serverAccounts[1]]),
      new Client('C3', 'Client3', 'Test3', 'client3 address', '2024-01-03', '1992-01-01', [serverAccounts[0], serverAccounts[1]]),
    ]

    const expectedClientsData = new ClientsData(expectedClients, cardTypes);

    service.getClients().subscribe(clientsData => {
      expect(clientsData).toEqual(expectedClientsData);
    });

    const reqClients = httpTestingController.expectOne(`${environment.apiUrl}/clients`);
    expect(reqClients.request.method).toEqual('GET');
    reqClients.flush(serverClients);

    const reqAccounts = httpTestingController.expectOne(`${environment.apiUrl}/accounts`);
    expect(reqAccounts.request.method).toEqual('GET');
    reqAccounts.flush(serverAccounts);
  });

  //TODO test with mismatch between account IDs indicated in a Client returned by the server and the set of available Accounts returned by the server.
  //TODO test for errors, if needed?
});
