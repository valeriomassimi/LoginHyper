import { Component, OnInit } from '@angular/core';
//import { MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

import { GetpatentsService } from '../_services/getpatents.service'
import { AlertService, AuthenticationService } from "@/_services";
import {Patent} from '../_models'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validatepatent',
  templateUrl: './validatepatent.component.html',
  styleUrls: ['./validatepatent.component.css']
})
export class ValidatepatentComponent implements OnInit {

  patent = new Patent('', '', '', false,"");

  //validator here is the username contained in the patent model
  validator:string
  response:any
  patents:any[];


  constructor(private patentService: GetpatentsService,
    private alertService:AlertService,
    private authenticationService: AuthenticationService,
    private router:Router
    ) { }

  ngOnInit() { this.getCurrUser() }

  getCurrUser(){
    this.validator= this.authenticationService.currentUserUsername
  
        }

    getPatents(validator:string) {
    validator=this.validator
    this.patentService.getPatents(validator).subscribe(res => {
        this.addPatent(res)  ;
        console.log(this.patents)
        return this.patents
      
      },
        err => {
          console.log(err)
          this.alertService.error(err)
        }
      )
  };

  addPatent(result) {
    return this.patents = result
  }

   validatePatent(patent: Patent){
    patent.username= this.validator
    this.patentService.validatePatent(patent)
    .subscribe(

      data => {
        console.log('succes', data);
        this.alertService.success('Patent validated', true)
        this.router.navigate(['']);
      },

      error => {
        console.log('eroro', error);
        this.alertService.error(error)
      }
    )}

}
