import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

const url = 'http://localhost:8000/upload'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public upload(
    files: Set<File>
  ): { [key: string]: { progress: Observable<number> } } {
    const status: {
      [key: string]: {
        progress: Observable<number>
      }
    } = {};
    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true

      });
      const progress = new Subject<number>();


      this.http.request(req).subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          progress.next(percentDone);
        }else if(event instanceof HttpResponse){
          progress.complete();
        }

      });
            // Save every progress-observable in a map of all observables
            status[file.name] = {
              progress: progress.asObservable()
            };
          });
      
          // return the map of progress.observables
          return status;
        }

}
