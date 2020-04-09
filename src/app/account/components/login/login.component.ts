import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, NavigationEnd } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });

    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    const loginData = this.loginForm.value;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.auth.login(loginData.email, loginData.password).subscribe(
      result => {
        if (result) {
          this.router.navigateByUrl("/home");
          alert(
            "SUCCESS!! :-)\n\n" + JSON.stringify(this.loginForm.value, null, 4)
          );
        } else {
          alert(
            "Failed!! :-)\n\n" + JSON.stringify(this.loginForm.value, null, 4)
          );
        }
      },
      error =>
        alert("Error!! :-)\n\n" + JSON.stringify(this.loginForm.value, null, 4))
    );
    // display form values on success
  }
}
