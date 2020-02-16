import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Patent } from "@/_models";
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


const blockchain = {
  "channel": "patentchannel",
  "chaincode": "patent",
  "method": "",
  "chaincodeVer": "1.0",
  "args": [""]
}


@Injectable({
  providedIn: 'root'
})
export class GetpatentsService {

  patents: Patent[];

  constructor(private http: HttpClient,
  ) { }

  getPatents(): Observable<Patent[]> {
    blockchain.method="queryAllPatents"
    blockchain.args=[""]
    return this.http.post<Patent[]>(environment.apiUrl+"/query", blockchain)

  };

  validatePatent(patent: Patent) {
    console.log(patent)
    blockchain.method = "validatePatent"
    blockchain.args = [patent.company + "_" + patent.name + "_" + patent.description]
    return this.http.post(environment.apiUrl + "/invocation", blockchain)

  }

}
