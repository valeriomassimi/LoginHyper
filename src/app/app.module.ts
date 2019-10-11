import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing } from './app-routing.module';

// import {
//     MatButtonModule,
//     MatDialogModule,
//     MatListModule,
//     MatProgressBarModule,
//   } from '@angular/material';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertComponent } from './_components/alert/alert.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecordpatentComponent } from './recordpatent/recordpatent.component';
import { ValidatepatentComponent } from './validatepatent/validatepatent.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { HeaderComponent } from './_components/header/header.component';
import { DialogComponent } from "./dialog/dialog.component";
import { DropzoneDirective } from './_directives/dropzone.directive';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        NgbActiveModal,
        NgbModal,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        RecordpatentComponent,
        ValidatepatentComponent,
        ProfilesComponent,
        HeaderComponent,
        DialogComponent,
        DropzoneDirective
    ],
    entryComponents:[DialogComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }