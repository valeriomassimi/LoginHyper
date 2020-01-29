import { Component, OnInit } from '@angular/core';

import { GetpatentsService } from '../_services/getpatents.service'
import { AlertService, AuthenticationService } from "@/_services";
import { Patent } from '../_models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';

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
  patentsRef: any;
  downloadURL: string
  profileUrl: Observable<Blob | null>;
  fileUrl;

  constructor(private patentService: GetpatentsService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getCurrUser()
  }

  getCurrUser() {
    this.validator = this.authenticationService.currentUserUsername

  }

  getPatents() {
    this.patentService.getPatents()
      .subscribe(res => {
        console.log(res);     
        this.patents=JSON.parse(res["result"]["payload"])
   
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
  
    const ref = this.storage.ref(path);
    ref.getDownloadURL().subscribe(
      file => {
        window.open(file, "_blank")

      },
      error=>{
        this.alertService.error("Immagine non trovata")
      }

    );
  }

  validatePatent(patent: Patent) {
    console.log("paten: "+patent.company);
    
    this.patentService.validatePatent(patent)
      .subscribe(

        data => {
          console.log('succes', data);
          this.alertService.success('Patent validated', true)
          this.getPatents()
          this.router.navigateByUrl('');
          this.getPatents()
        },

        error => {
          console.log('eroro', error);
          this.alertService.error(error)
        }
      )
  }

}
