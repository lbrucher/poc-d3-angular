import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environnements/environnement';

// export so it can be reused in tests
export interface ClientRaw {
  id: string;
  name: string;
  firstname: string|null;
  address: string|null;
  created: string;
  birthday: string;
  accounts: string[];
}


@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private http: HttpClient) { }

  private makeUrl(path: string) : string {
    return `${environment.apiUrl}${path}`;
  } 


  // private buildClients(rawClients: ClientRaw[], accounts: Account[]): Client[] {
  //   return rawClients.map<Client>(c => {
  //     const clientAccounts = accounts.filter(account => c.accounts.includes(account.id));
  //     return new Client(c.id, c.name, c.firstname, c.address, c.created, c.birthday, clientAccounts);
  //   });
  // }

  getClients(): Observable<Client[]> {
    return new Observable<Client[]>(sub => {
      // // Since we always fetch the entier list of clients and we know we'll also need their corresponding account info
      // // we'll also fetch accounts right here.
      // if (environment.useMockData) {
      //   console.log("Loading MOCK client and account data");
      //   sub.next( this.buildClients(this._mockClients, this._mockAccounts) );
      // }
      // else {
      //   console.log("Loading client and account data from server");
      //   this.http.get<ClientRaw[]>(this.makeUrl('/clients')).subscribe(rawClients => {
      //     console.log("RawClients: ", rawClients);
      //     this.http.get<Account[]>(this.makeUrl('/accounts')).subscribe(accounts => {
      //       console.log("All accounts: ", accounts);
      //       sub.next( this.buildClients(rawClients, accounts) );
      //     });
      //   });
      // }

      this.http.get<ClientRaw[]>(this.makeUrl('/clients')).subscribe({
        next: (rawClients) => {
          console.log("RawClients: ", rawClients);
          this.http.get<Account[]>(this.makeUrl('/accounts')).subscribe({
            next: (accounts) => {
              console.log("All accounts: ", accounts);

              const clients: Client[] = rawClients.map<Client>(c => {
                const clientAccounts = accounts.filter(account => c.accounts.includes(account.id));
                return new Client(c.id, c.name, c.firstname, c.address, c.created, c.birthday, clientAccounts);
              });

              sub.next(clients);
            },
            error: (err) => sub.error(err)
          });
        },
        error: (err) => sub.error(err)
      });
    });
  }


  // // I usually prefer to externalize mock data outside of the main application code and typically into its own little node server.
  // // This would also have the advantage of avoiding the 'if (useMockData)' and use the exact same code for mock or real data! 
  // // But this will do for now and in the context of this PoC
  // _mockClients: ClientRaw[] = [
  //   {
  //     "id": "60834cac4c8b724f5891fef0",
  //     "name": "OReilly",
  //     "firstname": "Brian",
  //     "address": "4584 Sunny Day Drive, Irvine, CA",
  //     "created": "2021-04-23 22:39:40+00:00",
  //     "birthday": "1989-05-23 13:25:14",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608572d363b913700be09a41",
  //     "name": "Simpson",
  //     "firstname": "Bart",
  //     "address": "SpringField, USA",
  //     "created": "2021-04-25 13:46:59+00:00",
  //     "birthday": "1995-04-14 13:25:14",
  //     "accounts": [
  //       "6084122499e57e9b1e12ac47",
  //       "6084118399e57e9b1e12ac45"
  //     ]
  //   },
  //   {
  //     "id": "608be94d2986514c3d5fa3b3",
  //     "name": "OReilly32",
  //     "firstname": "Brian",
  //     "address": "4584 Sunny Day Drive, Irvine, CA",
  //     "created": "2021-04-30 11:26:05+00:00",
  //     "birthday": "1989-05-23 13:25:14",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608be9782986514c3d5fa3b8",
  //     "name": "Rogers54",
  //     "firstname": "Steve",
  //     "address": null,
  //     "created": "2021-04-30 11:26:48+00:00",
  //     "birthday": "None",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608be9a72986514c3d5fa3be",
  //     "name": "Bruce22",
  //     "firstname": "Banner",
  //     "address": null,
  //     "created": "2021-04-30 11:27:35+00:00",
  //     "birthday": "None",
  //     "accounts": [
  //       "6084118399e57e9b1e12ac45"
  //     ]
  //   },
  //   {
  //     "id": "608be9ad2986514c3d5fa3bf",
  //     "name": "Bruce45",
  //     "firstname": "Banner",
  //     "address": null,
  //     "created": "2021-04-30 11:27:41+00:00",
  //     "birthday": "None",
  //     "accounts": [
  //       "6084118399e57e9b1e12ac45"
  //     ]
  //   },
  //   {
  //     "id": "60d062bee2e296a693143388",
  //     "name": "H",
  //     "firstname": "Hichem",
  //     "address": "Tunisia",
  //     "created": "2021-06-21 09:58:22+00:00",
  //     "birthday": "1994-11-28 01:00:14",
  //     "accounts": [
  //       "6084118399e57e9b1e12ac45",
  //       "60841429faf287a6e3f2a453",
  //       "6084122499e57e9b1e12ac47",
  //       "608577dc5bcabe685f68eb16"
  //     ]
  //   },
  //   {
  //     "id": "61dd84c9cf2e81ff0ab0deb1",
  //     "name": "TEST CRASH",
  //     "firstname": null,
  //     "address": null,
  //     "created": "2022-01-11 13:23:21+00:00",
  //     "birthday": "None",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608435723e45940a9f129cc3",
  //     "name": "O'Reilly",
  //     "firstname": "Brian",
  //     "address": "4584 Sunny Day Drive, Irvine, CA",
  //     "created": "2021-04-24 15:12:50+00:00",
  //     "birthday": "1989-05-23 13:25:14",
  //     "accounts": []
  //   },
  //   {
  //     "id": "60852d4073f51530bcf556ea",
  //     "name": "Bruce",
  //     "firstname": "Banner",
  //     "address": null,
  //     "created": "2021-04-25 08:50:08+00:00",
  //     "birthday": "None",
  //     "accounts": [
  //       "6084118399e57e9b1e12ac45"
  //     ]
  //   },
  //   {
  //     "id": "608be9302986514c3d5fa3b0",
  //     "name": "OReilly1",
  //     "firstname": "Brian",
  //     "address": "4584 Sunny Day Drive, Irvine, CA",
  //     "created": "2021-04-30 11:25:36+00:00",
  //     "birthday": "1989-05-23 13:25:14",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608be9442986514c3d5fa3b2",
  //     "name": "OReilly43",
  //     "firstname": "Brian",
  //     "address": "4584 Sunny Day Drive, Irvine, CA",
  //     "created": "2021-04-30 11:25:56+00:00",
  //     "birthday": "1989-05-23 13:25:14",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608be9662986514c3d5fa3b6",
  //     "name": "OReilly432",
  //     "firstname": "Brian",
  //     "address": "4584 Sunny Day Drive, Irvine, CA",
  //     "created": "2021-04-30 11:26:30+00:00",
  //     "birthday": "1989-05-23 13:25:14",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608be96e2986514c3d5fa3b7",
  //     "name": "OReilly54",
  //     "firstname": "Brian",
  //     "address": "4584 Sunny Day Drive, Irvine, CA",
  //     "created": "2021-04-30 11:26:38+00:00",
  //     "birthday": "1989-05-23 13:25:14",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608be98a2986514c3d5fa3ba",
  //     "name": "Bruce4",
  //     "firstname": "Banner",
  //     "address": null,
  //     "created": "2021-04-30 11:27:06+00:00",
  //     "birthday": "None",
  //     "accounts": [
  //       "6084118399e57e9b1e12ac45"
  //     ]
  //   },
  //   {
  //     "id": "60d05bf6cc9859d4191e576e",
  //     "name": "test",
  //     "firstname": "hich",
  //     "address": "4584 Sunny Day Drive, Irvine, CA",
  //     "created": "2021-06-21 09:29:26+00:00",
  //     "birthday": "1989-05-23 13:25:14",
  //     "accounts": [
  //       "6084118399e57e9b1e12ac45"
  //     ]
  //   },
  //   {
  //     "id": "62d6633083f70e36e21f6fc6",
  //     "name": "May",
  //     "firstname": "Brian",
  //     "address": "4Ltd. Windlesham, Surrey GU20 6YW, United Kingdom",
  //     "created": "2022-07-19 07:54:24+00:00",
  //     "birthday": "1947-07-14 11:00:00",
  //     "accounts": [
  //       "6084118399e57e9b1e12ac45"
  //     ]
  //   },
  //   {
  //     "id": "6084507e7e3c1a2d12e131a5",
  //     "name": "Matmati",
  //     "firstname": "Maher",
  //     "address": "05 rue sahl ibn Haroun, Manouba , Tunisie",
  //     "created": "2021-04-24 17:08:14+00:00",
  //     "birthday": "None",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608563cf63b913700be09a40",
  //     "name": "Simpson",
  //     "firstname": "Lisa",
  //     "address": "SpringField, USA",
  //     "created": "2021-04-25 12:42:55+00:00",
  //     "birthday": "1999-06-12 13:25:14",
  //     "accounts": [
  //       "60841429faf287a6e3f2a453"
  //     ]
  //   },
  //   {
  //     "id": "608577fb5bcabe685f68eb17",
  //     "name": "Simpson",
  //     "firstname": "Marge",
  //     "address": "SpringField, USA",
  //     "created": "2021-04-25 14:08:59+00:00",
  //     "birthday": "1960-04-14 13:25:14",
  //     "accounts": [
  //       "6084122499e57e9b1e12ac47",
  //       "6084118399e57e9b1e12ac45",
  //       "608577dc5bcabe685f68eb16"
  //     ]
  //   },
  //   {
  //     "id": "608be93e2986514c3d5fa3b1",
  //     "name": "OReilly3",
  //     "firstname": "Brian",
  //     "address": "4584 Sunny Day Drive, Irvine, CA",
  //     "created": "2021-04-30 11:25:50+00:00",
  //     "birthday": "1989-05-23 13:25:14",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608be95d2986514c3d5fa3b5",
  //     "name": "O'Reilly34",
  //     "firstname": "Brian",
  //     "address": "4584 Sunny Day Drive, Irvine, CA",
  //     "created": "2021-04-30 11:26:21+00:00",
  //     "birthday": "1989-05-23 13:25:14",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608be9992986514c3d5fa3bc",
  //     "name": "Bruce7",
  //     "firstname": "Banner",
  //     "address": null,
  //     "created": "2021-04-30 11:27:21+00:00",
  //     "birthday": "None",
  //     "accounts": [
  //       "6084118399e57e9b1e12ac45"
  //     ]
  //   },
  //   {
  //     "id": "6113a7ddbd1a623fd939f28f",
  //     "name": "OReilly",
  //     "firstname": "Yolo",
  //     "address": "4584 Sunny Day Drive, Irvine, CA",
  //     "created": "2021-08-11 10:35:09+00:00",
  //     "birthday": "None",
  //     "accounts": []
  //   },
  //   {
  //     "id": "61dd84c4be86411d7dbf30e4",
  //     "name": "TEST CRASH",
  //     "firstname": null,
  //     "address": null,
  //     "created": "2022-01-11 13:23:16+00:00",
  //     "birthday": "None",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608199c68e4675862bcc0e96",
  //     "name": "Rogers",
  //     "firstname": "Steve",
  //     "address": null,
  //     "created": "2021-04-22 15:44:06+00:00",
  //     "birthday": "None",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608be9562986514c3d5fa3b4",
  //     "name": "Rogers43",
  //     "firstname": "Steve",
  //     "address": null,
  //     "created": "2021-04-30 11:26:14+00:00",
  //     "birthday": "None",
  //     "accounts": []
  //   },
  //   {
  //     "id": "608be9812986514c3d5fa3b9",
  //     "name": "Bruce2",
  //     "firstname": "Banner",
  //     "address": null,
  //     "created": "2021-04-30 11:26:57+00:00",
  //     "birthday": "None",
  //     "accounts": [
  //       "6084118399e57e9b1e12ac45"
  //     ]
  //   },
  //   {
  //     "id": "65536a488a27746a6780fc3d",
  //     "name": "Savesalot",
  //     "firstname": "John",
  //     "address": "Etterbeek, Brussels",
  //     "created": "2023-11-14 12:38:32+00:00",
  //     "birthday": "1993-07-29 13:25:14",
  //     "accounts": [
  //       "608577dc5bcabe685f68eb16",
  //       "6084118399e57e9b1e12ac45",
  //       "6084122499e57e9b1e12ac47",
  //       "60841429faf287a6e3f2a453"
  //     ]
  //   }
  // ];

  // _mockAccounts: Account[] = [
  //   {
  //     "id": "608577dc5bcabe685f68eb16",
  //     "card_type": "VISA",
  //     "number": 412400,
  //     "balance": -100,
  //     "created": "2021-04-25 14:08:28+00:00"
  //   },
  //   {
  //     "id": "6084118399e57e9b1e12ac45",
  //     "card_type": "VISA",
  //     "number": 402400,
  //     "balance": 100,
  //     "created": "2021-04-24 12:39:31+00:00"
  //   },
  //   {
  //     "id": "6084122499e57e9b1e12ac47",
  //     "card_type": "MasterCard",
  //     "number": 405400,
  //     "balance": 200,
  //     "created": "2021-04-24 12:42:12+00:00"
  //   },
  //   {
  //     "id": "60841429faf287a6e3f2a453",
  //     "card_type": "American Express",
  //     "number": 542345,
  //     "balance": 0,
  //     "created": "2021-04-24 12:50:49+00:00"
  //   }
  // ];

}
