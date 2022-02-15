import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"]
})

export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    sub!: Subscription;

    constructor(private _productService : ProductService) {
    
    }

    filteredProducts: IProduct[] = [];

    private _listFilter: string = '';

    get listFilter() : string {
      return this._listFilter
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            
                product.productName.toLocaleLowerCase().includes(filterBy)
        );
    }

    products: IProduct[] = [];
    errorMessage: string = '';

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.sub = this._productService.getProducts().subscribe({
            next: products => 
            {
                this.products = products
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });       
    }

    ngOnDestroy(): void {
     this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
       this.pageTitle = 'Product List ' + message;
    }

    getStyleForProductName(product: IProduct) {
        if (product?.starRating > 4 ) {
           return {color: 'green', fontWeight : 'bold'}
        }

        return {};
    }

    getClassForPrice(product: IProduct) {
        if (product?.price > 30 ) {
           return ['highly-priced'];
        }

        return [];
    }
}