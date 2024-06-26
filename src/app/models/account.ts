export class Account {
  id: string;
  card_type: string;
  number: number;
  balance: number;
  created: string;

  constructor(id: string, card_type:string, number: number, balance:number, created:string) {
    this.id = id;
    this.card_type = card_type;
    this.number = number;
    this.balance = balance;
    this.created = created;
  }
}
