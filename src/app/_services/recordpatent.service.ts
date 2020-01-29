import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { AlertService } from './alert.service';
import { Patent } from "@/_models";

import { environment } from '../../environments/environment';


 let blockchain={
  "channel":  "samplech",
  "chaincode":  "patent",
  "method":  "recordPatent",
  "chaincodeVer":  "1.0",
  "args":  [""]
    }


@Injectable({
  providedIn: 'root'
})
export class RecordpatentService {

  
  constructor(private http: HttpClient,
    ) { }


  recordPatent(patent: Patent) {

    blockchain.args=[patent.company+"_"+patent.description+"_"+patent.name,patent.company,patent.name,patent.description,patent.fileInfo,patent.fileName];

    console.log(JSON.stringify(patent));
    return this.http.post(environment.apiUrl + "/invocation",blockchain)
  }

}
