import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { ClientsFilterComponent } from './clients-filter.component';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ClientsService } from '../services/clients.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    ClientsFilterComponent,
    ClientComponent,
    HttpClientModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  loadingClient: boolean = true;

  constructor(private clientService: ClientsService) {
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients || [];
      this.filteredClients = this.clients.slice(0);
      this.loadingClient = false;
    });
  }


  setFilteredClients(clients: Client[]) {
    this.filteredClients = clients||[];
  }
}
