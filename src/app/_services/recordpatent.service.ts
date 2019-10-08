import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { AlertService } from './alert.service';
import { PatentNew } from "@/_models";

import {  User} from "@/_models";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RecordpatentService {

   //data={'patent':Patent,'patentusername':string};

  baseUrl= "http://192.168.100.166:8080/api"
  constructor(private http: HttpClient,
    private alertService:AlertService,
    private router:Router
    ) { }


  recordPatent(patent: PatentNew) {

    console.log(JSON.stringify(patent));
    this.http.post(this.baseUrl + "/recordpatent/",patent).subscribe(

      data => {
      
        console.log('succes', data);
        this.alertService.success('Patent added',true)
        this.router.navigate(['']);
      },

      error =>{ console.log('eroro', error);
      this.alertService.error(error)

      }
    )
  }
}
