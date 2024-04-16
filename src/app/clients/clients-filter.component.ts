import { Component, Input } from '@angular/core';
import { Client } from '../models/client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients-filter.component.html',
//  styleUrl: './clients.component.scss'
})
export class ClientsFilterComponent {

  @Input()
  get clients(): Client[]|null { return this._clients; }
  set clients(clients: Client[]|null) {
    this._clients = clients;
console.log("_clients: ",this._clients);
}

  private _clients: Client[]|null = null;





}
