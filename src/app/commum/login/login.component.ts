import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  private httpReq: Subscription

  statusResponse: number
  messageApi: string

  constructor() {

  }

  ngOnInit() {
  }
}
