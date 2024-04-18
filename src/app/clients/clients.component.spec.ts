import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import { ClientsService } from '../services/clients.service';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { ClientsData } from '../models/clients-data';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let clientsServiceStub: Partial<ClientsService>;

  beforeEach(async () => {
    clientsServiceStub = {};

    await TestBed.configureTestingModule({
      imports: [ClientsComponent],
      providers: [{ provide: ClientsService, useValue: clientsServiceStub }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;

    TestBed.inject(ClientsService);
  });


  it('should display an error message when an error retrieving clients occurred', () => {
    clientsServiceStub.getClients = ():Observable<ClientsData> => {
      return new Observable<ClientsData>(sub => {
        throw new Error("BLAH");
      });
    };
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('.clients .load-error');
    expect(el.textContent).toEqual("There was an error loading client data: BLAH")
  });

  it('should display a loading message while retrieving the clients information', () => {
    clientsServiceStub.getClients = ():Observable<ClientsData> => {
      return new Observable<ClientsData>(sub => {
        setTimeout(() => sub.next({clients:[], cardTypes:[]}), 1000);
      });
    };
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('.clients .loading');
    expect(el.textContent).toEqual(" Loading clients information... ");
  });

  it('should display clients information on success', () => {
    clientsServiceStub.getClients = ():Observable<ClientsData> => {
      return new Observable<ClientsData>(sub => sub.next({
        clients:[
          {id:'C1', name:'Test Client1', firstname:null, address:'Client1 address', created:'2024-01-01', birthday:'1990-01-01', accounts:[]} as Client,
          {id:'C2', name:'Test Client2', firstname:null, address:'Client2 address', created:'2024-01-02', birthday:'1991-01-01', accounts:[]} as Client,
          {id:'C3', name:'Test Client3', firstname:null, address:'Client3 address', created:'2024-01-02', birthday:'1991-01-01', accounts:[]} as Client,
        ],
        cardTypes:[]
      }));
    };
    fixture.detectChanges();

    // loading message not displayed
    expect(fixture.nativeElement.querySelector('.clients .loading')).toBeNull();

    // no error message displayed
    expect(fixture.nativeElement.querySelector('.clients .load-error')).toBeNull();

    // display clients
    const els = fixture.nativeElement.querySelectorAll('.clients .content > ul li');
    expect(els).toHaveSize(3);
    expect(els[0].querySelector('li .client-info .name').textContent).toEqual('Test Client1');
    expect(els[1].querySelector('li .client-info .name').textContent).toEqual('Test Client2');
    expect(els[2].querySelector('li .client-info .name').textContent).toEqual('Test Client3');
  });


  //TODO verify the address is properly displayed
  //TODO verify the birthdate is properly displayed
  //TODO verify the client name is in red when there are negative account balances
  //TODO verify the client name is not in red when there are no negative account balances
});
