export class Client {
  id: string;
  name: string;
  firstname: string|null;
  address: string|null;
  created: string;
  birthday: string;
  accounts: string[];

  constructor(id: string, name: string, firstname:string|null, address:string|null, created:string, birthday:string, accounts:string[]) {
    this.id = id;
    this.name = name;
    this.firstname = firstname;
    this.address = address;
    this.created = created;
    this.birthday = birthday;
    this.accounts = accounts;
  }
}
