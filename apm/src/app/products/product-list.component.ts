import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"]
})

export class ProductListComponent implements OnInit, OnDestroy{
    public pageTitle = "Product List";
    public imageWidth = 50;
    public imageMargin = 2;
    public showImage = false;
    public filteredProducts: IProduct[] = [];
    public products: IProduct[] = [];
    private sub: Subscription | null = null;
    private _listFilter = '';
    private errorMessage = '';

    constructor(private readonly _productService : ProductService) {};

    public get listFilter() : string {
      return this._listFilter
    }

    public set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    public performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            
                product.productName.toLocaleLowerCase().includes(filterBy)
        );
    }

    public toggleImage(): void {
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
       this.sub?.unsubscribe();
    }

    public onRatingClicked(message: string): void {
       this.pageTitle = 'Product List ' + message;
    }

    public getStyleForProductName(product: IProduct) {
        if (product?.starRating > 4 ) {
           return {color: 'green', fontWeight : 'bold'}
        }

        return {};
    }

    public getClassForPrice(product: IProduct) {
        if (product?.price > 30 ) {
           return ['highly-priced'];
        }

        return [];
    }
}