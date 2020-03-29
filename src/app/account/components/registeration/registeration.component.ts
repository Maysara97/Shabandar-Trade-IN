import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MustMatch } from "../../models/matchPassword";

@Component({
  selector: "app-registeration",
  templateUrl: "./registeration.component.html",
  styleUrls: ["./registeration.component.scss"]
})
export class RegisterationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstname: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z]+$")]
        ],
        lastname: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z]+$")]
        ],
        email: ["", [Validators.required, Validators.email]],
        telephonenumber: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z]+$")]
        ],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
        company: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value, null, 4)
    );
  }
}
