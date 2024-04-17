import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private allAccounts: Account[] | null = null;

  private fetchAccounts(): Observable<Account[]> {
    if (!!this.allAccounts) {
console.log("FetchAccounts: all accounts already loaded");
      return new Observable<Account[]>(sub => sub.next(this.allAccounts || []));
    }
    else {
console.log("FetchAccounts: LOADING all accounts...");
      this.allAccounts = this._accounts;
      return new Observable<Account[]>(sub => {
        // setTimeout(()=>{
        //   sub.next(this.allAccounts || [])
        // }, 0);
        sub.next(this.allAccounts || [])
      });
    }
  }

  getAccounts(ids: string[]): Observable<Account[]> {
    return new Observable<Account[]>(sub => {
      // get all the accounts
      this.fetchAccounts().subscribe(accounts => {
        // filter based on the given ids
        const selectedAccounts = accounts.filter(account => ids.includes(account.id));
        sub.next(selectedAccounts);
      });
    });
  }



  _accounts: Account[] = [
    {
      "id": "608577dc5bcabe685f68eb16",
      "card_type": "VISA",
      "number": 412400,
      "balance": -100,
      "created": "2021-04-25 14:08:28+00:00"
    },
    {
      "id": "6084118399e57e9b1e12ac45",
      "card_type": "VISA",
      "number": 402400,
      "balance": 100,
      "created": "2021-04-24 12:39:31+00:00"
    },
    {
      "id": "6084122499e57e9b1e12ac47",
      "card_type": "MasterCard",
      "number": 405400,
      "balance": 200,
      "created": "2021-04-24 12:42:12+00:00"
    },
    {
      "id": "60841429faf287a6e3f2a453",
      "card_type": "American Express",
      "number": 542345,
      "balance": 0,
      "created": "2021-04-24 12:50:49+00:00"
    }
  ];
}
