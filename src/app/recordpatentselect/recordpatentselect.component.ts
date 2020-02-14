import { Component, OnInit } from '@angular/core';
// import { } from "";
import { RecordpatentService } from '@/_services';

@Component({
  selector: 'app-recordpatentselect',
  templateUrl: './recordpatentselect.component.html',
  styleUrls: ['./recordpatentselect.component.css']
})
export class RecordpatentselectComponent implements OnInit {

  constructor(private patentService: RecordpatentService) { }

  ngOnInit() {
  }

  selectType(type: String) {
    this.patentService.changeSelectedType(type)

  }

}
