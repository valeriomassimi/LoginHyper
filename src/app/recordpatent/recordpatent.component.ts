import { Component, OnInit ,ViewChild} from '@angular/core';
import { Patent } from '../_models';
import { RecordpatentService } from '../_services'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-recordpatent',
  templateUrl: './recordpatent.component.html',
  styleUrls: ['./recordpatent.component.css']
})
export class RecordpatentComponent implements OnInit {


  @ViewChild('patentForm') patentForm:NgForm;
  
  patentModel = new Patent('', '', '', false);

  constructor(private patentService:RecordpatentService) { }

  ngOnInit() {}

  recordPatent(patentModel){
    this.patentService.recordPatent(patentModel)
    this.patentForm.resetForm()
  }
}
