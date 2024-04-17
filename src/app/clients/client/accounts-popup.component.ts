import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client';
import { Account } from '../../models/account';


@Component({
  selector: 'app-accounts-popup',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './accounts-popup.component.html',
  styleUrl: './accounts-popup.component.scss'
})
export class AccountsPopupComponent {
  @Input('client') client!: Client;
  @Input('accounts') accounts!: Account[];
  @Input('clientName') clientName!: string;


}
