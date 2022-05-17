import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  video: {
    link :'https://www.youtube.com/watch?v=A-4vRAGDY2U',
    img : 'https://img.youtube.com/vi/A-4vRAGDY2U'
  }

  constructor(private router: Router) {}
  map(){
    this.router.navigate(['tabs/maps']);

  }
}
