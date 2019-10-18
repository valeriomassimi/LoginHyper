import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { AlertService } from './alert.service';
import { Patent } from "@/_models";

import {  User} from "@/_models";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RecordpatentService {

  
  constructor(private http: HttpClient,
    ) { }


  recordPatent(patent: Patent) {

    console.log(JSON.stringify(patent));
    return this.http.post(environment.apiUrl + "/recordpatent/",patent)
  }

}
