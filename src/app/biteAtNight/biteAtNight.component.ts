import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactmanager-app',
  template: `
<app-home></app-home>
  `,//have to add my parent home component here.
  styles: []
})
export class BiteAtNightComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("homecomponent reached");
  }

}
