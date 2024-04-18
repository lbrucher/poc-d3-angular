import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { ClientsFilterComponent } from './clients-filter.component';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ClientsService } from '../services/clients.service';
import { HttpClientModule } from '@angular/common/http';
import { CardType } from '../models/card-type';

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
  cardTypes: CardType[] = [];
  filteredClients: Client[] = [];
  loadingClient: boolean = true;
  loadError: string|null = null;

  constructor(private clientService: ClientsService) {
  }

  ngOnInit(): void {
    this.loadError = null;
    this.clientService.getClients().subscribe({
      next: (clientsData) => {
        this.clients = clientsData.clients || [];
        this.cardTypes = clientsData.cardTypes || [];
        this.filteredClients = this.clients.slice(0);
        this.loadingClient = false;
      },
      error: (err) => {
        this.loadError = err.message;
        this.loadingClient = false;
      }
    });
  }


  setFilteredClients(clients: Client[]) {
    this.filteredClients = clients||[];
  }
}
