import { Component, OnInit, ViewChild, OnDestroy, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { RecordpatentService, AlertService } from '../_services'
import { NgForm } from '@angular/forms'
import { AuthenticationService } from "../_services";
import { Patent } from '../_models'
import * as hash from "hash.js";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-recordpatent',
  templateUrl: './recordpatent.component.html',
  styleUrls: ['./recordpatent.component.css']
})
export class RecordpatentComponent implements OnInit {

  @ViewChild('patentForm') patentForm: NgForm;

  isHovering: boolean;

  files: File[] = [];
  fileUp: boolean = false;
  fileInfo: string;

  task: AngularFireUploadTask;

  percentage: Observable<number>
  snapshot: Observable<any>
  downloadURL: string
  username:string
  hash:string=""



  patentModel = new Patent('', '', '', false, "");


  constructor(private patentService: RecordpatentService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() { }


  getCurrUser() {
    return this.authenticationService.currentUserUsername

  }

  // handle file upload 

  // handle file  on click
  clickUpload(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      this.fileInfo = hash.sha256().update(files.item(i).name + files.item(i).lastModified + files.item(i).type).digest('hex')
    }
    this.fileUp = true
  }

  // handle file on drop
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      this.fileInfo = (hash.sha256().update(files.item(i).name + files.item(i).lastModified + files.item(i).type).digest('hex'))
    }
    this.fileUp = true
  }


  //register the patent on hyperldger

  async recordPatent(patentModel) {
    patentModel.username = await this.getCurrUser()
    patentModel.fileInfo=this.fileInfo
    this.patentService.recordPatent(patentModel)
      .subscribe(
        data => {
          console.log('succes', data);
          this.alertService.success('Patent added', true);
          this.router.navigate(['']);
          this.patentForm.resetForm()
        },
        error => {
            console.error('eroro', error);
            this.alertService.error(error)
            this.patentForm.resetForm()
        }
      )
  };

  // async startUpload() {

  //   this.username=await this.getCurrUser()

  //   this.hash=hash.sha256().update(this.file.name + this.file.lastModified + this.file.type).digest('hex')

  //   const path = `patents/${this.username}/${this.hash}/${this.file.name}`;

  //   const ref = this.storage.ref(path);

  //   this.task = this.storage.upload(path, this.file)

  //   this.percentage = this.task.percentageChanges();

  //   // console.log(this.downloadURL = await ref.getDownloadURL().toPromise());
  //   // this.db.collection('patents').add({ downloadURL: this.downloadURL, path }).catch(error=>{console.error(error)})

  //   this.snapshot = this.task.snapshotChanges().pipe(
  //     //tap(console.log),
  //     finalize(async () => {
  //       this.downloadURL = await ref.getDownloadURL().toPromise();
  //       console.log(this.downloadURL)
  //       this.db.collection('patents').add({ downloadURL: this.downloadURL, path }).catch(error=>{console.error(error)})
  //     }),

  //   );
  // }

  // isActive(snapshot) {
  //   return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  // }


}




