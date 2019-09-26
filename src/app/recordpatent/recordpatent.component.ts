import { Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RecordpatentService, AlertService } from '../_services'
import { NgForm } from '@angular/forms'
import { AuthenticationService } from "../_services";
import {PatentNew} from '../_models'

@Component({
  selector: 'app-recordpatent',
  templateUrl: './recordpatent.component.html',
  styleUrls: ['./recordpatent.component.css']
})
export class RecordpatentComponent implements OnInit {



  @ViewChild('patentForm') patentForm: NgForm;

  //patentModel = new Patent('', '', '', false);
  patentModel = new PatentNew('', '', '', false,"");
  

  constructor(private patentService: RecordpatentService,
    private authenticationService:AuthenticationService,
    private alertService:AlertService,
    private router:Router
  ) { }

  ngOnInit() { }



   getCurrUser(){
    return this.authenticationService.currentUserUsername
  
        }

  async recordPatent(patentModel) {
   patentModel.username = await this.getCurrUser()
    this.patentService.recordPatent(patentModel)
    this.alertService.success('Patent added',true)
    this.patentForm.resetForm()
  
  }

}




