import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client';
import { AccountsChartComponent } from './accounts-chart.component';
import { Account } from '../../models/account';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsPopupComponent } from './accounts-popup.component';
import { CardType } from '../../models/card-type';
import { ChartData } from '../chart-data';

class BalanceRep {
  percent: number;
  count: number;
  constructor(percent:number, count:number){
    this.percent = percent;
    this.count = count;
  }
}

// Expose the # of positive and negative account balances
class BalanceRepartitions {
  positive: BalanceRep;
  negative: BalanceRep;
  constructor(accounts:Account[]){
    const countPos = accounts.filter(a => a.balance >= 0).length;
    const countNeg = accounts.length - countPos;

    this.positive = new BalanceRep(accounts.length===0?0:countPos/accounts.length, countPos);
    this.negative = new BalanceRep(accounts.length===0?0:countNeg/accounts.length, countNeg);
  }
}

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    AccountsChartComponent,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  balancesRep: BalanceRepartitions = new BalanceRepartitions([]);

  @Input('chartData') chartData!: ChartData;

  accountsToShow: Account[] = [];

  private _client!: Client;
  @Input('client')
  get client(): Client { return this._client; }
  set client(client: Client) {
    this._client = client;
    this.balancesRep = new BalanceRepartitions(client.accounts);
    this.buildAccountsToShow();
  }

  private _cardTypes!: CardType[];
  @Input('cardTypes')
  get cardTypes(): CardType[] { return this._cardTypes; }
  set cardTypes(types: CardType[]) {
    this._cardTypes = types;
    this.buildAccountsToShow();
  }

  constructor(private modalService: NgbModal){
  }

  private buildAccountsToShow() {
    if (!!this._client && !!this._cardTypes) {
      const types = this._cardTypes.map(ct => ct.name);
      this.accountsToShow = this._client.accounts.filter(a => types.includes(a.card_type));
    }
  }

  getClientName(): string {
    const firstname = this.client.firstname||'';
    const spacer = firstname.length > 0 ? ' ' : '';
    return `${firstname}${spacer}${this.client.name}`;
  }

  hasDoB(): boolean {
    // Verify we have a valid date
    const ts = Date.parse(this.client.birthday||'');
    return !isNaN(ts);
  }

  getClientDoB(): string {
    // Output whatever we got in the client model
    // API does not return an ISO date, which is too bad.
    return this.client.birthday;
  }

  showAccountDetails() {
    // Skip if there are no accounts to show
    if (this.accountsToShow.length > 0){
      const modalRef = this.modalService.open(AccountsPopupComponent, {size:'lg'});
      modalRef.componentInstance.client = this.client;
      modalRef.componentInstance.clientName = this.getClientName();
    }
  }

  onChartClicked() {
    this.showAccountDetails();
  }
}
