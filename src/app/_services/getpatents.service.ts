import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Patent, PatentNew } from "@/_models";
import { Observable } from 'rxjs';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GetpatentsService {

  baseUrl = "http://192.168.100.166:8080/api"
  patents: Patent[];

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private router:Router
  ) { }

  getPatents(patent:Patent) {
    this.http.get(this.baseUrl + '/queryall').subscribe(res => {
      this.addPatent(res)
      return this.patents
      
    },
      err => {
        console.log(err)
        this.alertService.error(err)
      }
    )
  };

  addPatent(result) {
    return this.patents = result

  }


  validatePatent(patent: Patent) {
    console.log(patent)
    //console.log(JSON.stringify(this.validatedPatent))
    return this.http.put(this.baseUrl + "/validatepatent/", patent).subscribe(

      data => {

        console.log('succes', data);
        this.alertService.success('Patent validated', true)
        this.router.navigate(['']);
      },


      error => {
        console.log('eroro', error);
        this.alertService.error('error')
      }
    )

  }
}
