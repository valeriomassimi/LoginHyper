import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RecordpatentService, AlertService } from '../_services'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms'
import { AuthenticationService } from "../_services";
import { Patent } from '../_models'
import { DialogComponent } from '@/dialog/dialog.component';

@Component({
  selector: 'app-recordpatent',
  templateUrl: './recordpatent.component.html',
  styleUrls: ['./recordpatent.component.css']
})
export class RecordpatentComponent implements OnInit {



  @ViewChild('patentForm') patentForm: NgForm;

  
  patentModel = new Patent('', '', '', false,"");


  constructor(private patentService: RecordpatentService,
    private authenticationService: AuthenticationService,
    public activeModal:NgbModal,
    private router: Router,
    
  ) { }

  ngOnInit() { }



  getCurrUser() {
    return this.authenticationService.currentUserUsername

  }

  async recordPatent(patentModel) {
    patentModel.username = await this.getCurrUser()
    this.patentService.recordPatent(patentModel)
    this.patentForm.resetForm()

  }

  openUpDialog() {
    let dialogRef = this.activeModal.open(DialogComponent, {
  

    })
  }
}




