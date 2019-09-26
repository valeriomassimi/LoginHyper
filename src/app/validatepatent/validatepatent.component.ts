import { Component, OnInit } from '@angular/core';
//import { MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { Patent } from '../_models'
import { GetpatentsService } from '../_services/getpatents.service'
import { AlertService, AuthenticationService } from "@/_services";
import {PatentNew} from '../_models'

@Component({
  selector: 'app-validatepatent',
  templateUrl: './validatepatent.component.html',
  styleUrls: ['./validatepatent.component.css']
})
export class ValidatepatentComponent implements OnInit {

  patent = new PatentNew('', '', '', false,"");

  closeResult: string;

  constructor(private patentService: GetpatentsService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit( ) { }

  getCurrUser(){
    return this.authenticationService.currentUserUsername
  
        }

  getPatents() {
    console.log(this.patentService.getPatents())
    this.patentService.getPatents()
  };

  async onSelect(patent: PatentNew) {
    patent.username=await this.getCurrUser()
    this.patentService.validatePatent(patent)
  }
}
