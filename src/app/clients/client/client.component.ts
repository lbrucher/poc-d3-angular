import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client';
import { AccountsChartComponent } from './accounts-chart.component';

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
  @Input('client') client!: Client;


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
