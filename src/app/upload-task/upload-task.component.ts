import { Component, OnInit, Input, ErrorHandler, EventEmitter, Output } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {  AuthenticationService } from '@/_services';
import * as hash from 'hash.js'

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  @Input() company:string
  @Output() uploadOk=new EventEmitter<any>();

  task: AngularFireUploadTask;

  percentage: Observable<number>
  snapshot: Observable<any>
  downloadURL: string
  username:string
  hash:string

  constructor(private storage: AngularFireStorage,
    private db: AngularFirestore,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    //this.startUpload()
  }

  getCurrUser() {
    return this.authenticationService.currentUserUsername
  }


  async startUpload() {

    this.username=await this.getCurrUser()

    this.hash=hash.sha256().update(this.file.name + this.file.lastModified + this.file.type).digest('hex')

    const path = `patents/${this.company}/${this.hash}/${this.file.name}`;

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file)

    this.percentage = this.task.percentageChanges();

    // console.log(this.downloadURL = await ref.getDownloadURL().toPromise());
    // this.db.collection('patents').add({ downloadURL: this.downloadURL, path }).catch(error=>{console.error(error)})
    this.uploadOk.emit();
    this.snapshot = this.task.snapshotChanges().pipe(
      //tap(console.log),
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        console.log(this.downloadURL)
        this.db.collection('patents').add({ downloadURL: this.downloadURL, path })
        .catch(error=>{console.error(error)})
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
