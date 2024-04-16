import { Component, Input } from '@angular/core';
import { Client } from '../models/client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client.component.html',
//  styleUrl: './clients.component.scss'
})
export class ClientComponent {
  @Input('client') client!: Client;





}
