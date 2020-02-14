import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { AlertService } from './alert.service';
import { Patent } from "@/_models";
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';


 let blockchain={
  "channel":  "patentchannel",
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
  
    private selectedType = new BehaviorSubject<String>("");
    currentSelected = this.selectedType.asObservable();

    changeSelectedType(type: String) {
      this.selectedType.next(type);
    }


  recordPatent(patent: Patent) {

    blockchain.args=[patent.company,patent.name,patent.description,patent.fileInfo,patent.fileName,patent.type];

    console.log(JSON.stringify(patent));
    return this.http.post(environment.apiUrl + "/invocation",blockchain)
  }

}
