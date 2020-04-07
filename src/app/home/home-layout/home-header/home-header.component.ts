import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home-header",
  templateUrl: "./home-header.component.html",
  styleUrls: ["./home-header.component.scss"]
})
export class HomeHeaderComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  constructor(public _route: Router) {}

  ngOnInit(): void {}

  hideNav() {
    const x = document.getElementById("mainNav");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  public navigateToSection(section: string) {
    window.location.hash = "";
    window.location.hash = section;
  }
}
