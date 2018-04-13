import { Component } from '@angular/core';
// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavabarComponent } from './components/navabar/navabar.component';
import { FormsComponent } from './forms/forms.component';



// Route Configuration
export const routes: Routes = [
    { path: '', component: FormsComponent },
    { path: 'forms', component: FormsComponent },
    {path: 'header', component: HeaderComponent},
    {path: 'footer', component: FooterComponent},
    { path: 'navbar', component: NavabarComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
