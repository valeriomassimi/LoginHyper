import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards';
import { Component } from '@angular/core';
import { RecordpatentComponent } from './recordpatent/recordpatent.component';
import { ValidatepatentComponent } from './validatepatent/validatepatent.component';
import { ProfilesComponent } from './profiles/profiles.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard],
    /*children:[
        {path:'record',component:RecordpatentComponent},
        {path:'validate',component:ValidatepatentComponent}]

},*/},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path:'profiles',component:ProfilesComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);