import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { ClientsFilterComponent } from './clients-filter.component';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ClientsService } from '../services/clients.service';
import { HttpClientModule } from '@angular/common/http';
import { CardType } from '../models/card-type';
import { ChartData } from './chart-data';

class LegendItem {
  type: string;
  color: string;
  constructor(type:string, color:string){
    this.type=type;
    this.color=color;
  }
}

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
  loadError: string|null = null;
  barChartData!: ChartData;
  accountsChartLegendItems: LegendItem[] = [];

  cardTypes: {type:CardType, selected:boolean}[] = [];
  selectedCardTypes: CardType[] = [];

  constructor(private clientService: ClientsService) {
  }

  private buildChartData(clients:Client[]): ChartData {
    const min = Math.min(...clients.map(c => Math.min(...c.accounts.map(a => a.balance))));
    const max = Math.max(...clients.map(c => Math.max(...c.accounts.map(a => a.balance))));
    return new ChartData(min, max);
  }

  private buildAccountsChartLegend() {
    return this.cardTypes.map(ct => new LegendItem(ct.type.name, ct.type.color));
  }

  private rebuildSelectedCardTypes() {
    this.selectedCardTypes = this.cardTypes.filter(ct => ct.selected).map(ct => ct.type);
  }

  ngOnInit(): void {
    this.loadError = null;
    this.clientService.getClients().subscribe({
      next: (clientsData) => {
        this.clients = clientsData.clients || [];
        this.cardTypes = (clientsData.cardTypes || []).map(ct => ({type:ct, selected:true}));
        this.filteredClients = this.clients.slice(0);
        this.barChartData = this.buildChartData(this.clients);
        this.accountsChartLegendItems = this.buildAccountsChartLegend();
        this.rebuildSelectedCardTypes();
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

  selectCardType(cardType:string, event:any) {
    // toggle the current selection
    const type = this.cardTypes.find(ct => ct.type.name === cardType);
    if (type == null){
      return;
    }
    type.selected = !type.selected;
    
    // Find the <input> element corresponding to the item we clicked on so that we can properly set its check/uncheck state
    // When we click on the <input>, the state changes but it does not when we click outside of the <input>.
    // This is why we override the <input> state so it's accurate on all circumstances.
    // First find the <span> element corresponding to the legend item
    let el = event.target;
    while(el.className !== 'legend-item') {
      el = el.parentElement;
    }
    // Then find the child <input> element underneath the <span>
    const elInput:any = Array.from(el.childNodes).find((e:any) => e.nodeName === 'INPUT');

    // Correclty set the <input> state
    elInput.checked = type.selected;

    // Rebuild the list of now selected card types
    this.rebuildSelectedCardTypes();
  }
}
