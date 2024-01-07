import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = 'mattheuscontato17@gmail.com'
  linkSucces = false

  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    ) {}

  ngOnInit(): void {}

  async signIn() {
    this.spinner.show()

    const result = await this.auth.login(this.email)
    console.log(result)

    this.spinner.hide()
    if(!result.error) { 
      this.linkSucces = true
    } 
    alert(result.error?.message)
  }
}
