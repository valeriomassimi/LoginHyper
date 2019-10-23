import { Component, OnInit } from '@angular/core';
//import { MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

import { GetpatentsService } from '../_services/getpatents.service'
import { AlertService, AuthenticationService } from "@/_services";
import { Patent } from '../_models'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-validatepatent',
  templateUrl: './validatepatent.component.html',
  styleUrls: ['./validatepatent.component.css']
})
export class ValidatepatentComponent implements OnInit {

  patent = new Patent('', '', '', false, "");

  //validator here is the username contained in the patent model
  validator: string
  response: any
  patents: Patent[] = [];
  pressed: boolean = false;
  patentsRef:any;
  downloadURL:string
  //fileFirestore:Observable

  constructor(private patentService: GetpatentsService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private db: AngularFirestore,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getCurrUser()
    this.patents.map(Record => {

    })
  }

  getCurrUser() {
    this.validator = this.authenticationService.currentUserUsername

  }

  getPatents(validator: string) {
    validator = this.validator
    this.patentService.getPatents(validator)
      .subscribe(res => {
         this.patents=res
        console.log(this.patents)
        this.pressed = true
      })
   
      err => {
        console.log(err)
        this.alertService.error(err)
      }
  };


  //download the file corresponding to the patent from fireabse storage to local
  downloadFile(path: string) {
    console.log(path);
    
    this.patentsRef = this.db.collection("patents",
    ref=>ref.where("path","==",path)).snapshotChanges();

    this.patentsRef.subscribe(doc=>{
      this.downloadURL=doc[0].payload.doc._document.proto.fields.downloadURL.stringValue
      this.patentService.getFirestoreFile(this.downloadURL).subscribe(
        data=>{console.log(data);
        }
      )
    })
   

   // var docRef=this.db.collection("patents").where()
  }

  validatePatent(patent: Patent) {
    patent.username = this.validator
    this.patentService.validatePatent(patent)
      .subscribe(

        data => {
          console.log('succes', data);
          this.alertService.success('Patent validated', true)
          this.getPatents(patent.username)
          this.router.navigateByUrl('');
          this.getPatents(patent.username)
        },

        error => {
          console.log('eroro', error);
          this.alertService.error(error)
        }
      )
  }

}
