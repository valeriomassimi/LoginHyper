import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Subject } from "rxjs";

import { AlertService } from "@/_services";
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {

    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
      setTimeout(() => this.message=false, 5000);
      
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
