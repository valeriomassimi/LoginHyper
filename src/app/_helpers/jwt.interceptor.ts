import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@/_services';
import { environment } from 'environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic Y3VzdG9tZXJ0ZW5hbnRAb3JhY2xlLmNvbTp3ZWxjb21lMQ==`
                }
            });
        }
       
        return next.handle(request);
    }
}