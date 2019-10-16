import { Component, OnInit, ViewChild, OnDestroy, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecordpatentService, AlertService } from '../_services'
import { NgForm } from '@angular/forms'
import { AuthenticationService } from "../_services";
import { Patent } from '../_models'
import * as hash from "hash.js";

@Component({
  selector: 'app-recordpatent',
  templateUrl: './recordpatent.component.html',
  styleUrls: ['./recordpatent.component.css']
})
export class RecordpatentComponent implements OnInit {


 
  @ViewChild('patentForm') patentForm: NgForm;

  isHovering: boolean;

  files: File[] = [];
  fileUp:boolean=false;
  fileInfo:string;
  

  patentModel = new Patent('', '', '', false, "");
 

  constructor(private patentService: RecordpatentService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() { }


  getCurrUser() {
    return this.authenticationService.currentUserUsername

  }

  // handle file upload 

  // handle file  on click
  clickUpload(files:FileList){
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      this.fileInfo=hash.sha256().update(files.item(i).name + files.item(i).lastModified+ files.item(i).type).digest('hex')
    }
    this.fileUp=true
  }

  // handle file on drop
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      this.fileInfo=(hash.sha256().update(files.item(i).name + files.item(i).lastModified+ files.item(i).type).digest('hex'))
    }
    this.fileUp=true
  }

   
  //register the patent on hyperldger

  async recordPatent(patentModel) {
    patentModel.username = await this.getCurrUser()
    this.patentService.recordPatent(patentModel)
    this.patentForm.resetForm()

  }

}




