import { Component, OnInit, ViewChild } from '@angular/core';
//import { MatDialogRef } from '@angular/material';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from '../_services/upload.service';
import { forkJoin } from 'rxjs'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  @ViewChild('file') file
  public files: Set<File> = new Set()

  progress
  fileAdded = false
  canBeClosed = true
  primaryButtonText = 'Upload'
  showCancelButton = true
  uploading = false
  uploadSuccessful = false

  constructor(public activeModal: NgbActiveModal,
    public uploadService: UploadService,
    public ngModal:NgbModal
    ) { }

  ngOnInit() {
  }

  addFiles() {
    this.file.nativeElement.click()
    console.log(this.file.html)

  }

  onFilesAdded(event) {

    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    } this.fileAdded = true
    console.log(event)
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {

      return this.activeModal.close();

    }

    this.uploading = true;

    this.progress = this.uploadService.upload(this.files);

    let allProgressObservables = [];
    for (let key in this.progress) {

      allProgressObservables.push(this.progress[key].progress);
    }

    this.primaryButtonText = 'Finish';

    this.canBeClosed = false;
    //this.activeModal.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      //this.activeModal.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });


  }

}
