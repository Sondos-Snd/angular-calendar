import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8081/api/ressources';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  selectedDate:any;

  constructor() { }

  getResources(selectedDate:any) {
    return [
      {
        id:1,
        name: "Ress 1",
        description: "sthg",
        ressgroup: "sthg",
      },
      {
        id:2,
        name: "Ress 2",
        description: "sthg",
        ressgroup: "sthg",
      },
      {
        id:3,
        name: "Ress 4",
        description: "sthg",
        ressgroup: "sthg",
      },
      {
        id:4,
        name: "Ress 5",
        description: "sthg",
        ressgroup: "sthg",
      },
      {
        id:5,
        name: "Ress 6",
        description: "sthg",
        ressgroup: "sthg",
      },
      {
        id:6,
        name: "Ress 7",
        description: "sthg",
        ressgroup: "sthg",
      },
    ];
  }

//   getAll(): Observable<any> {
//     return this.http.get(baseUrl);
//   }

//   create(data:any): Observable<any> {
//     return this.http.post(baseUrl, data);
//   }
// }
}