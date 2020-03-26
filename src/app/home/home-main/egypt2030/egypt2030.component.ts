import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "app-egypt2030",
  templateUrl: "./egypt2030.component.html",
  styleUrls: ["./egypt2030.component.scss"]
})
export class Egypt2030Component implements OnInit {
  myBackgroundImageUrl = "./assets/images/You-Trade-In/background-end.png";
  constructor() {}

  ngOnInit() {}
  @HostBinding("style.backgroundImage")
  getBackgroundImageUrl() {
    return `url(${this.myBackgroundImageUrl})`;
  }
}
