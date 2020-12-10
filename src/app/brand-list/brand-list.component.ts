import { Component, OnInit } from "@angular/core";

import { products } from "../products";

@Component({
  selector: "app-brand-list",
  templateUrl: "./brand-list.component.html",
  styleUrls: ["./brand-list.component.css"]
})
export class BrandListComponent implements OnInit {
  brands: string[] = [...new Set(products.map(x => x.brand))];
  constructor() {}

  ngOnInit() {}
}
