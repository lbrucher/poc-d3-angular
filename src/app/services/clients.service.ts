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

  getClients(): Observable<Client[]> {
    // Since we always fetch the entire list of clients and we know we'll also need their corresponding account info
    // we'll also fetch accounts right here.
    return new Observable<Client[]>(sub => {
      // Fetch all clients first
      this.http.get<ClientRaw[]>(this.makeUrl('/clients')).subscribe({
        next: (rawClients) => {
          console.log("RawClients: ", rawClients);
          // Then fetch all accounts
          this.http.get<Account[]>(this.makeUrl('/accounts')).subscribe({
            next: (accounts) => {
              console.log("All accounts: ", accounts);

              // Combine accounts and clients data
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
}
