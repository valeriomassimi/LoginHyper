import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Patent } from "@/_models";
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetpatentsService {

  patents: Patent[];

  constructor(private http: HttpClient,
  ) { }

  getPatents(validator:string) {
     return this.http.get(environment.apiUrl + '/queryall/'+validator)
    //.pipe(map(res=>{
    //   return res.json().results.map(patent=>{
    //     console.log(patent)
    //     return new Patent(
    //       patent.company,
    //       patent.name,
    //       patent.description,
    //       patent.fileInfo,
    //     )
    //   })
  
    
  };

 

  validatePatent(patent: Patent) {
    console.log(patent)
    return this.http.put(environment.apiUrl + "/validatepatent/", patent)

  }
}
