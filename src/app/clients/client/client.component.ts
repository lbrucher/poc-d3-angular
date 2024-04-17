import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client';
import { AccountsChartComponent } from './accounts-chart.component';
import { Account } from '../../models/account';
import { AccountsService } from '../../services/accounts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsPopupComponent } from './accounts-popup.component';

class BalanceRep {
  percent: number;
  count: number;
  constructor(percent:number, count:number){
    this.percent = percent;
    this.count = count;
  }
}
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
export class ClientComponent implements OnInit {
  @Input('client') client!: Client;
  balancesRep: BalanceRepartitions = new BalanceRepartitions([]);
  accounts: Account[] = [];

  constructor(private accountService: AccountsService, private modalService: NgbModal){
  }

  ngOnInit(): void {
    this.accountService.getAccounts(this.client.accounts).subscribe(accounts => {
      this.accounts = accounts;
      this.balancesRep = new BalanceRepartitions(this.accounts);
    });
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
    const modalRef = this.modalService.open(AccountsPopupComponent, {size:'lg'});
    modalRef.componentInstance.client = this.client;
    modalRef.componentInstance.accounts = this.accounts;
    modalRef.componentInstance.clientName = this.getClientName();
  }

  onChartClicked() {
    this.showAccountDetails();
  }
}
