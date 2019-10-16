import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Patent } from "@/_models";
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetpatentsService {

  patents: Patent[];

  constructor(private http: HttpClient,
    private alertService: AlertService,
    private router:Router
  ) { }

  getPatents() {
    this.http.get(environment.apiUrl + '/queryall/AndreaT').subscribe(res => {
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
    return this.http.put(environment.apiUrl + "/validatepatent/", patent).subscribe(

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
