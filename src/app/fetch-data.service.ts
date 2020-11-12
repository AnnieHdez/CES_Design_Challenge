import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Table} from './table.model';
import { TableService } from './table.service';

@Injectable({providedIn: 'root'})
export class FetchDataService {
  constructor(private http: HttpClient, private tableService: TableService) {}

  private collection = [new Table(["Name", "Price", "Catagory"], ["string", "string", "currency"], [20, 20, 40], [
        { "Name": "Eaton BR120AF BR AFCI Circuit Breaker", "Price" : 2.50, "Catagory": "Power Distribution / Arc Fault"},
        { "Name": "Eaton CHFCAF115 AFCI Circuit Breaker, 15A, 10 kAIC, Single-Pole, 120/240V", "Price" : 3, "Catagory": "Power Distribution / Arc Fault"},
        { "Name": "Elite Lighting B26IC-AT-W 6 inch Shallow Recessed Mount Fixture, 120V, 60/65/75W, Metallic Gray", "Price" : 4, "Catagory": "Lighting / Recessed Lighting / Recessed In Ceiling Housing"},
        { "Name": "Elite Lighting B26RIC-AT-W 6 Inch Shallow IC Remodel Housing", "Price" : 6.00, "Catagory": "Lighting / Recessed Lighting / Recessed In Ceiling Housing"},
        { "Name": "Duracell PC2400 Alkaline-Manganese Dioxide Battery", "Price" : 1.50, "Catagory": "Battery / Batteries / AAA thru 9 Volt Batteries / Battery Type AAA"},
        { "Name": "Duracell PC2300 Alkaline-Manganese Dioxide Battery", "Price" : 1.50, "Catagory": "Battery / Batteries / AAA thru 9 Volt Batteries / Battery Type AAA"},
        { "Name": "Duracell PC2200 Alkaline-Manganese Dioxide Battery", "Price" : 1.50, "Catagory": "Battery / Batteries / AAA thru 9 Volt Batteries / Battery Type AAA"}
      ]),
      new Table(["userId", "jobTitleName", "firstName","lastName", "preferredFullName", "employeeCode","region", "phoneNumber", "emailAddress"], ["string", "string", "currency","string", "string", "currency","string", "string", "currency"], [20, 20, 40, 20, 20, 40,20, 20, 40],[
          {"userId":"rirani","jobTitleName":"Developer","firstName":"Romin","lastName":"Irani","preferredFullName":"Romin Irani","employeeCode":"E1","region":"CA","phoneNumber":"408-1234567","emailAddress":"romin.k.irani@gmail.com"},
          {"userId":"nirani","jobTitleName":"Developer","firstName":"Neil","lastName":"Irani","preferredFullName":"Neil Irani","employeeCode":"E2","region":"CA","phoneNumber":"408-1111111","emailAddress":"neilrirani@gmail.com"},
          {"userId":"thanks","jobTitleName":"Program Directory","firstName":"Tom","lastName":"Hanks","preferredFullName":"Tom Hanks","employeeCode":"E3","region":"CA","phoneNumber":"408-2222222","emailAddress":"tomhanks@gmail.com"}
          ])

    ];
    
  fetchData(production: boolean, table: string) {
    if(production)
    {
      return this.http
          .get<Table>(
              'https://demo8483635.mockable.io/'+table
          )
          .subscribe( table =>{
            this.tableService.updateTable(table);
            console.log(table);
          });
        }
      else{
        if(table == 'table1')
          this.tableService.updateTable(this.collection[0]);
        if(table == 'table2')
          this.tableService.updateTable(this.collection[1]);
      }
  }
}
  
  //   "columnsNames":["name", "address", "skills", "veteran"],
  //   "columnsTypes":["string", "string", "string", "boolean"],
  //   "columnsWidths": [20, 20, 40, 20],
  //  "data":
  //   {'name': 'Smith','address': 'Australia','skills': 'PHP', 'boolean': true},
  //   {'name':'William', 'address':'England','skills': 'Java', 'boolean':true},
  //   {'name':'Andy', 'address':'Africa','skills': 'Perl', 'boolean': false},
  //   {'name':'Jhon', 'address':'Africa','skills': 'JavaScript', 'boolean': false},
  //   {'name':'Flower', 'address':'Brazil','skills': 'Angular', 'boolean':true},
  //   {'name':'Grant', 'address':'India','skills': 'JavaScript', 'boolean':true},
  //   {'name':'Root', 'address':'Sri Lanka','skills': 'PHP', 'boolean': false},
  //   {'name':'Joy', 'address':'Canada','skills': 'NodeJS', 'boolean': false},
  //   {'name':'Samson', 'address':'India','skills': 'JavaScript', 'boolean':true},
  //   {'name':'Sanju', 'address':'India','skills': 'PHP', 'boolean':true},
  //   {'name':'Rocky', 'address':'America','skills': 'PHP', 'boolean': false},
  //   {'name':'Monty', 'address':'England','skills': 'Angular', 'boolean': false},
  //   {'name':'Peter', 'address':'England','skills': 'JavaScript', 'boolean':true},
  //   {'name':'Fleming', 'address':'Newziland','skills': 'PHP', 'boolean':true},
  //   {'name':'Astle', 'address':'England','skills': 'Angular', 'boolean': false},
  //   {'name':'Chris', 'address':'France','skills': 'JavaScript', 'boolean': false},
  //   {'name':'Butler', 'address':'England','skills': 'PHP', 'boolean':true}
  // };


   // element = { "products" : [
    //     { "Name": "Eaton BR120AF BR AFCI Circuit Breaker", "Price" : 2.50, "Catagory": "Power Distribution / Arc Fault"},
    //     { "Name": "Eaton CHFCAF115 AFCI Circuit Breaker, 15A, 10 kAIC, Single-Pole, 120/240V", "Price" : 3, "Catagory": "Power Distribution / Arc Fault"},
    //     { "Name": "Elite Lighting B26IC-AT-W 6 inch Shallow Recessed Mount Fixture, 120V, 60/65/75W, Metallic Gray", "Price" : 4, "Catagory": "Lighting / Recessed Lighting / Recessed In Ceiling Housing"},
    //     { "Name": "Elite Lighting B26RIC-AT-W 6 Inch Shallow IC Remodel Housing", "Price" : 6.00, "Catagory": "Lighting / Recessed Lighting / Recessed In Ceiling Housing"},
    //     { "Name": "Duracell PC2400 Alkaline-Manganese Dioxide Battery", "Price" : 1.50, "Catagory": "Battery / Batteries / AAA thru 9 Volt Batteries / Battery Type AAA"},
    //     { "Name": "Duracell PC2300 Alkaline-Manganese Dioxide Battery", "Price" : 1.50, "Catagory": "Battery / Batteries / AAA thru 9 Volt Batteries / Battery Type AAA"},
    //     { "Name": "Duracell PC2200 Alkaline-Manganese Dioxide Battery", "Price" : 1.50, "Catagory": "Battery / Batteries / AAA thru 9 Volt Batteries / Battery Type AAA"}
    //   ],
    //   "Employees" : [
    //   {"userId":"rirani","jobTitleName":"Developer","firstName":"Romin","lastName":"Irani","preferredFullName":"Romin Irani","employeeCode":"E1","region":"CA","phoneNumber":"408-1234567","emailAddress":"romin.k.irani@gmail.com"},
    //   {"userId":"nirani","jobTitleName":"Developer","firstName":"Neil","lastName":"Irani","preferredFullName":"Neil Irani","employeeCode":"E2","region":"CA","phoneNumber":"408-1111111","emailAddress":"neilrirani@gmail.com"},
    //   {"userId":"thanks","jobTitleName":"Program Directory","firstName":"Tom","lastName":"Hanks","preferredFullName":"Tom Hanks","employeeCode":"E3","region":"CA","phoneNumber":"408-2222222","emailAddress":"tomhanks@gmail.com"}
    //   ]
      
    //   }