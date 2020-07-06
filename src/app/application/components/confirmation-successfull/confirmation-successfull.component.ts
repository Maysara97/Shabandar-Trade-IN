import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-successfull',
  templateUrl: './confirmation-successfull.component.html',
  styleUrls: ['./confirmation-successfull.component.scss']
})
export class ConfirmationSuccessfullComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  continueToLogin(){
    this.router.navigate(['/account/login'])
  }

}
