import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";

import { products } from "../products";
import { CartService } from "../cart.service";
import { CartItem } from "../cart-item";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  product;
  qtyForm;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.qtyForm = this.formBuilder.group({
      qty: new FormControl(1, [Validators.required])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.product = products[params.get("productId")];
    });
  }

  onSubmit(customerData) {
    const cartItem = <CartItem>{
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      brand: this.product.brand,
      qty: customerData.qty
    };
    this.addToCart(cartItem);
    /*this.qtyForm.reset();*/
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert("Your product has been added to the cart!");
  }
}
