import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements OnInit {
  myBackgroundImageUrl = "./assets/images/You-Trade-In/Header.png";
  constructor() {}

  ngOnInit() {}
  @HostBinding("style.backgroundImage")
  getBackgroundImageUrl() {
    return `url(${this.myBackgroundImageUrl})`;
  }
}
