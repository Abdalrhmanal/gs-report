import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sitting-countact',
  imports: [
  ],
  templateUrl: './sitting-countact.component.html',
  styleUrl: './sitting-countact.component.css'
})
export class SittingCountactComponent{
   constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}

