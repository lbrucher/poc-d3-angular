import { CardType } from "./card-type";
import { Client } from "./client";

export class ClientsData {
  clients: Client[];
  cardTypes: CardType[];

  constructor(clients:Client[], cardTypes:CardType[]) {
    this.clients = clients;
    this.cardTypes = cardTypes;
  }
}
