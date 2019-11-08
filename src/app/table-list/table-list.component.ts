import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { RammmadService } from 'app/Service/rammmad.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  // user table
  users: any = [];

  // specialist table
  allspecialist: any = [];

  // kin table
  kin: any = [];

  constructor(
    public rammmadService: RammmadService
  ) { }

  ngOnInit() {
    // getting displaying infor
    this.rammmadService.getallusers().then(users => {
      let used: any = users;
      // console.log(used);
      for (let key in used) {
        this.users.push(used[key]);
        
      }
    })

    this.rammmadService.getallspecialist().then(specialist => {
      let data:any = specialist;
      // console.log( data);
      for (let key in data) {
        this.allspecialist.push(data[key]);
      }
    })

    this.rammmadService.getNextofKin().then(kinns => {
      let data:any = kinns;
      // console.log( data);
      for (let key in data) {
        this.kin.push(data[key]);
        // console.log(this.kin);
      }
    })

  }

}
