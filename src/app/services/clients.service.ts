import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() { }

  getClients(): Observable<Client[]> {
    return new Observable<Client[]>(sub => {
      setTimeout(() => {
        sub.next(this.clients);
//        sub.next(this.clients.slice(6,7));
//        sub.next(this.clients.slice(1,2));
//        sub.next(this.clients.slice(0,9));
      }, 500);
    });
  }


  clients: Client[] = [
    {
      "id": "60834cac4c8b724f5891fef0",
      "name": "OReilly",
      "firstname": "Brian",
      "address": "4584 Sunny Day Drive, Irvine, CA",
      "created": "2021-04-23 22:39:40+00:00",
      "birthday": "1989-05-23 13:25:14",
      "accounts": []
    },
    {
      "id": "608572d363b913700be09a41",
      "name": "Simpson",
      "firstname": "Bart",
      "address": "SpringField, USA",
      "created": "2021-04-25 13:46:59+00:00",
      "birthday": "1995-04-14 13:25:14",
      "accounts": [
        "6084122499e57e9b1e12ac47",
        "6084118399e57e9b1e12ac45"
      ]
    },
    {
      "id": "608be94d2986514c3d5fa3b3",
      "name": "OReilly32",
      "firstname": "Brian",
      "address": "4584 Sunny Day Drive, Irvine, CA",
      "created": "2021-04-30 11:26:05+00:00",
      "birthday": "1989-05-23 13:25:14",
      "accounts": []
    },
    {
      "id": "608be9782986514c3d5fa3b8",
      "name": "Rogers54",
      "firstname": "Steve",
      "address": null,
      "created": "2021-04-30 11:26:48+00:00",
      "birthday": "None",
      "accounts": []
    },
    {
      "id": "608be9a72986514c3d5fa3be",
      "name": "Bruce22",
      "firstname": "Banner",
      "address": null,
      "created": "2021-04-30 11:27:35+00:00",
      "birthday": "None",
      "accounts": [
        "6084118399e57e9b1e12ac45"
      ]
    },
    {
      "id": "608be9ad2986514c3d5fa3bf",
      "name": "Bruce45",
      "firstname": "Banner",
      "address": null,
      "created": "2021-04-30 11:27:41+00:00",
      "birthday": "None",
      "accounts": [
        "6084118399e57e9b1e12ac45"
      ]
    },
    {
      "id": "60d062bee2e296a693143388",
      "name": "H",
      "firstname": "Hichem",
      "address": "Tunisia",
      "created": "2021-06-21 09:58:22+00:00",
      "birthday": "1994-11-28 01:00:14",
      "accounts": [
        "6084118399e57e9b1e12ac45",
        "60841429faf287a6e3f2a453",
        "6084122499e57e9b1e12ac47",
        "608577dc5bcabe685f68eb16"
      ]
    },
    {
      "id": "61dd84c9cf2e81ff0ab0deb1",
      "name": "TEST CRASH",
      "firstname": null,
      "address": null,
      "created": "2022-01-11 13:23:21+00:00",
      "birthday": "None",
      "accounts": []
    },
    {
      "id": "608435723e45940a9f129cc3",
      "name": "O'Reilly",
      "firstname": "Brian",
      "address": "4584 Sunny Day Drive, Irvine, CA",
      "created": "2021-04-24 15:12:50+00:00",
      "birthday": "1989-05-23 13:25:14",
      "accounts": []
    },
    {
      "id": "60852d4073f51530bcf556ea",
      "name": "Bruce",
      "firstname": "Banner",
      "address": null,
      "created": "2021-04-25 08:50:08+00:00",
      "birthday": "None",
      "accounts": [
        "6084118399e57e9b1e12ac45"
      ]
    },
    {
      "id": "608be9302986514c3d5fa3b0",
      "name": "OReilly1",
      "firstname": "Brian",
      "address": "4584 Sunny Day Drive, Irvine, CA",
      "created": "2021-04-30 11:25:36+00:00",
      "birthday": "1989-05-23 13:25:14",
      "accounts": []
    },
    {
      "id": "608be9442986514c3d5fa3b2",
      "name": "OReilly43",
      "firstname": "Brian",
      "address": "4584 Sunny Day Drive, Irvine, CA",
      "created": "2021-04-30 11:25:56+00:00",
      "birthday": "1989-05-23 13:25:14",
      "accounts": []
    },
    {
      "id": "608be9662986514c3d5fa3b6",
      "name": "OReilly432",
      "firstname": "Brian",
      "address": "4584 Sunny Day Drive, Irvine, CA",
      "created": "2021-04-30 11:26:30+00:00",
      "birthday": "1989-05-23 13:25:14",
      "accounts": []
    },
    {
      "id": "608be96e2986514c3d5fa3b7",
      "name": "OReilly54",
      "firstname": "Brian",
      "address": "4584 Sunny Day Drive, Irvine, CA",
      "created": "2021-04-30 11:26:38+00:00",
      "birthday": "1989-05-23 13:25:14",
      "accounts": []
    },
    {
      "id": "608be98a2986514c3d5fa3ba",
      "name": "Bruce4",
      "firstname": "Banner",
      "address": null,
      "created": "2021-04-30 11:27:06+00:00",
      "birthday": "None",
      "accounts": [
        "6084118399e57e9b1e12ac45"
      ]
    },
    {
      "id": "60d05bf6cc9859d4191e576e",
      "name": "test",
      "firstname": "hich",
      "address": "4584 Sunny Day Drive, Irvine, CA",
      "created": "2021-06-21 09:29:26+00:00",
      "birthday": "1989-05-23 13:25:14",
      "accounts": [
        "6084118399e57e9b1e12ac45"
      ]
    },
    {
      "id": "62d6633083f70e36e21f6fc6",
      "name": "May",
      "firstname": "Brian",
      "address": "4Ltd. Windlesham, Surrey GU20 6YW, United Kingdom",
      "created": "2022-07-19 07:54:24+00:00",
      "birthday": "1947-07-14 11:00:00",
      "accounts": [
        "6084118399e57e9b1e12ac45"
      ]
    },
    {
      "id": "6084507e7e3c1a2d12e131a5",
      "name": "Matmati",
      "firstname": "Maher",
      "address": "05 rue sahl ibn Haroun, Manouba , Tunisie",
      "created": "2021-04-24 17:08:14+00:00",
      "birthday": "None",
      "accounts": []
    },
    {
      "id": "608563cf63b913700be09a40",
      "name": "Simpson",
      "firstname": "Lisa",
      "address": "SpringField, USA",
      "created": "2021-04-25 12:42:55+00:00",
      "birthday": "1999-06-12 13:25:14",
      "accounts": [
        "60841429faf287a6e3f2a453"
      ]
    },
    {
      "id": "608577fb5bcabe685f68eb17",
      "name": "Simpson",
      "firstname": "Marge",
      "address": "SpringField, USA",
      "created": "2021-04-25 14:08:59+00:00",
      "birthday": "1960-04-14 13:25:14",
      "accounts": [
        "6084122499e57e9b1e12ac47",
        "6084118399e57e9b1e12ac45",
        "608577dc5bcabe685f68eb16"
      ]
    },
    {
      "id": "608be93e2986514c3d5fa3b1",
      "name": "OReilly3",
      "firstname": "Brian",
      "address": "4584 Sunny Day Drive, Irvine, CA",
      "created": "2021-04-30 11:25:50+00:00",
      "birthday": "1989-05-23 13:25:14",
      "accounts": []
    },
    {
      "id": "608be95d2986514c3d5fa3b5",
      "name": "O'Reilly34",
      "firstname": "Brian",
      "address": "4584 Sunny Day Drive, Irvine, CA",
      "created": "2021-04-30 11:26:21+00:00",
      "birthday": "1989-05-23 13:25:14",
      "accounts": []
    },
    {
      "id": "608be9992986514c3d5fa3bc",
      "name": "Bruce7",
      "firstname": "Banner",
      "address": null,
      "created": "2021-04-30 11:27:21+00:00",
      "birthday": "None",
      "accounts": [
        "6084118399e57e9b1e12ac45"
      ]
    },
    {
      "id": "6113a7ddbd1a623fd939f28f",
      "name": "OReilly",
      "firstname": "Yolo",
      "address": "4584 Sunny Day Drive, Irvine, CA",
      "created": "2021-08-11 10:35:09+00:00",
      "birthday": "None",
      "accounts": []
    },
    {
      "id": "61dd84c4be86411d7dbf30e4",
      "name": "TEST CRASH",
      "firstname": null,
      "address": null,
      "created": "2022-01-11 13:23:16+00:00",
      "birthday": "None",
      "accounts": []
    },
    {
      "id": "608199c68e4675862bcc0e96",
      "name": "Rogers",
      "firstname": "Steve",
      "address": null,
      "created": "2021-04-22 15:44:06+00:00",
      "birthday": "None",
      "accounts": []
    },
    {
      "id": "608be9562986514c3d5fa3b4",
      "name": "Rogers43",
      "firstname": "Steve",
      "address": null,
      "created": "2021-04-30 11:26:14+00:00",
      "birthday": "None",
      "accounts": []
    },
    {
      "id": "608be9812986514c3d5fa3b9",
      "name": "Bruce2",
      "firstname": "Banner",
      "address": null,
      "created": "2021-04-30 11:26:57+00:00",
      "birthday": "None",
      "accounts": [
        "6084118399e57e9b1e12ac45"
      ]
    },
    {
      "id": "65536a488a27746a6780fc3d",
      "name": "Savesalot",
      "firstname": "John",
      "address": "Etterbeek, Brussels",
      "created": "2023-11-14 12:38:32+00:00",
      "birthday": "1993-07-29 13:25:14",
      "accounts": [
        "608577dc5bcabe685f68eb16",
        "6084118399e57e9b1e12ac45",
        "6084122499e57e9b1e12ac47",
        "60841429faf287a6e3f2a453"
      ]
    }
  ];
}
