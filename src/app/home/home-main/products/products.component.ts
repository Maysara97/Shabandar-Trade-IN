import { Component, OnInit, HostBinding } from "@angular/core";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  myBackgroundImageUrl = "./assets/images/You-Trade-In/Products.png";
  constructor() {}

  ngOnInit() {}
  @HostBinding("style.backgroundImage")
  getBackgroundImageUrl() {
    return `url(${this.myBackgroundImageUrl})`;
  }
}
