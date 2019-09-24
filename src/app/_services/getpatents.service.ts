import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Patent } from "@/_models";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetpatentsService {

  baseUrl = "http://192.168.100.181:8080/api"

  patents: Patent[];

  constructor(private http: HttpClient) { }

  getPatents(){
    this.http.get(this.baseUrl + '/queryall').subscribe(res => {
      this.addPatent(res)
      return this.patents
    },
      err => {
        console.log(err)
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

      data => console.log('succes', data),
      error => console.log('eroro', error)

    )

  }
}
