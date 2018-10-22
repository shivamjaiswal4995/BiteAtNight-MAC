import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


//**readabout routerModule...
const routes: Routes  = [
  { path: 'biteAtNight', loadChildren: './biteAtNight/biteAtNight.module#biteAtNightModule' },
  { path: '**', redirectTo: 'biteAtNight' }
];

@NgModule({
  declarations: [
    AppComponent,
 ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {} 
