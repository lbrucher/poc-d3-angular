import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { ClientsFilterComponent } from './clients-filter.component';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    ClientsFilterComponent,
    ClientComponent
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  clients: Client[] | null;


  constructor(private clientService: ClientsService) {
    this.clients = null;
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }


  setFilteredClients(clients: Client[]) {

  }

}
