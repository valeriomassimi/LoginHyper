import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Patent } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class RecordpatentService {

  baseUrl= "http://192.168.100.181:8080/api"
  constructor(private http: HttpClient) { }

  recordPatent(patent: Patent) {
    console.log(JSON.stringify(patent));
    this.http.post(this.baseUrl + "/recordpatent/", patent).subscribe(

      data => console.log('succes', data),
      error => console.log('eroro', error)
    )
  }
}
