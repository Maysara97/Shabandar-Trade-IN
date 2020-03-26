import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "app-home-read-more",
  templateUrl: "./home-read-more.component.html",
  styleUrls: ["./home-read-more.component.scss"]
})
export class HomeReadMoreComponent implements OnInit {
  myBackgroundImageUrl = "./assets/images/You-Trade-In/background-end.png";
  constructor() {}

  ngOnInit() {}
  @HostBinding("style.backgroundImage")
  getBackgroundImageUrl() {
    return `url(${this.myBackgroundImageUrl})`;
  }
}
