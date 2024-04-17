import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client';
import { AccountsChartComponent } from './accounts-chart.component';

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
  constructor(countPos:number, countNeg:number){
    const total = countPos+countNeg;
    this.positive = new BalanceRep(total===0?0:countPos/total*100, countPos);
    this.negative = new BalanceRep(total===0?0:countNeg/total*100, countNeg);
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
  balancesRep: BalanceRepartitions = new BalanceRepartitions(0,0);

  ngOnInit(): void {
    this.balancesRep = new BalanceRepartitions(3,1);
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


}
