import { Component, OnInit } from '@angular/core';

import { GetpatentsService } from '../_services/getpatents.service'
import { AlertService, AuthenticationService } from "@/_services";
import { Patent } from '../_models'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { saveAs } from 'file-saver';
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
  //fileFirestore:Observable

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
        this.patents = res
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

    const ref = this.storage.ref(path);
    ref.getDownloadURL().subscribe(
      file => {
        window.open(file,"_blank")

      }

    );
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
