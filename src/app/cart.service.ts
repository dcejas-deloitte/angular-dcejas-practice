import { Injectable } from "@angular/core";

import { CartItem } from "./cart-item";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CartService {
  items: CartItem[] = [];
  numberOfItems = 0;
  subtotal = 0;
  constructor(private http: HttpClient) {}

  addToCart(product) {
    this.items.push(product);
    this.updateStats();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.updateStats();
    return this.items;
  }

  removeFromCart(product) {
    this.items.splice(this.items.indexOf(product), 1);
    console.log(this.items);
    this.updateStats();
  }

  updateStats() {
    this.numberOfItems = 0;
    for (let i = 0; i < this.items.length; i++) {
      this.numberOfItems += this.items[i].qty;
    }

    this.subtotal = 0;
    for (let i = 0; i < this.items.length; i++) {
      this.subtotal += this.items[i].qty * this.items[i].price;
    }
  }

  getShippingPrices() {
    return this.http.get("/assets/shipping.json");
  }
}
