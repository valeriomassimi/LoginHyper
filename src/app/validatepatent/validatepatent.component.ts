import { Component, OnInit } from '@angular/core';
//import { MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { Patent } from '../_models'
import { GetpatentsService } from '../_services/getpatents.service'
import { AlertService } from "@/_services";

@Component({
  selector: 'app-validatepatent',
  templateUrl: './validatepatent.component.html',
  styleUrls: ['./validatepatent.component.css']
})
export class ValidatepatentComponent implements OnInit {

  closeResult: string;

  constructor(private patentService: GetpatentsService,
    private alertService:AlertService
    ) { }

  ngOnInit( ) { }

  getPatents() {
    console.log(this.patentService.getPatents())
    this.patentService.getPatents()
  };

  onSelect(patent: Patent) {

  this.patentService.validatePatent(patent)
 
  }
}
