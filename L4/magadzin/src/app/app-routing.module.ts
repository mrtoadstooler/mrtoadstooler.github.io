import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { ScreenCatalogComponent } from "./screen/catalog.component";
import { ScreenContactComponent } from "./screen/contact.component";
import { ScreenMainComponent } from "./screen/main.component";
import { ScreenLoginComponent } from "./screen/login.component";
import { ScreenSignupComponent } from "./screen/signup.component";

const routes: Routes = [
    { path: 'catalog', component: ScreenCatalogComponent },
    { path: 'contacts', component: ScreenContactComponent },
    { path: '', component: ScreenMainComponent },
    { path: 'login', component: ScreenLoginComponent },
    { path: 'signup', component: ScreenSignupComponent },
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes)],
    declarations: [
        ScreenCatalogComponent,
        ScreenContactComponent,
        ScreenMainComponent,
        ScreenLoginComponent,
        ScreenSignupComponent,
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
