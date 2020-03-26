import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  myBackgroundImageUrl = "assets/images/You-Trade-In/SignUp2.png";
  constructor() {}

  ngOnInit() {}

  @HostBinding("style.backgroundImage")
  getBackgroundImageUrl() {
    return `url(${this.myBackgroundImageUrl})`;
  }
}
