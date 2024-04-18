import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../models/client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients-filter.component.html',
})
export class ClientsFilterComponent {
  private _clients: Client[] = [];

  inputText: string = "";

  @Input()
  get clients(): Client[] { return this._clients; }
  set clients(clients: Client[]) {
    this._clients = clients||[];
  }

  @Output('setClients') setClients = new EventEmitter<Client[]>();


  inputTextKeyPressed(event:any){
    if (event.key === 'Enter'){
      if (this._clients == null){
        return;
      }
  
      const lowText = this.inputText.toLowerCase();
      const clients = this._clients.filter(c => `${c.firstname||''} ${c.name}`.toLowerCase().includes(lowText))
      this.setClients.emit(clients);
    }
  }
}
