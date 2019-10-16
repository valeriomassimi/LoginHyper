import { Component, OnInit } from '@angular/core';
//import { MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

import { GetpatentsService } from '../_services/getpatents.service'
import { AlertService, AuthenticationService } from "@/_services";
import {Patent} from '../_models'

@Component({
  selector: 'app-validatepatent',
  templateUrl: './validatepatent.component.html',
  styleUrls: ['./validatepatent.component.css']
})
export class ValidatepatentComponent implements OnInit {

  patent = new Patent('', '', '', false,"");

  closeResult: string;

  constructor(private patentService: GetpatentsService,

    private authenticationService: AuthenticationService
    ) { }

  ngOnInit( ) { }

  getCurrUser(){
    return this.authenticationService.currentUserUsername
  
        }

    getPatents() {
    this.patentService.getPatents()
  };

   validatePatent(patent: Patent){
    //patent.username=await this.getCurrUser()
    this.patentService.validatePatent(patent)
  }

}
