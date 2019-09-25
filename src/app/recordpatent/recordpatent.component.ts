import { Component, OnInit, ViewChild } from '@angular/core';
import { Patent } from '../_models';
import { RecordpatentService } from '../_services'
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
  nome:string

  constructor(private patentService: RecordpatentService,
    private authenticationService:AuthenticationService
  ) { }

  ngOnInit() { }

   getCurrUser(){
    return this.authenticationService.currentUserUsername
  
        }

  async recordPatent(patentModel) {
   patentModel.username = await this.getCurrUser()
    this.patentService.recordPatent(patentModel)
    console.log(patentModel)
    this.patentForm.resetForm()
    this.nome=this.getCurrUser()
  }
}




