import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProductListComponent } from "./product-list.component";
import { ProductService } from "./product.service";
import * as testObject from "src/assets/products.json";
import { IProduct } from "./product";
import { of } from "rxjs";
import { ConvertToSpacesPipe } from "../shared/convert-to-spaces.pipe";
import { CurrencyPipe, DatePipe } from "@angular/common";

describe('ProductListComponent', () => {
    let fixture: ComponentFixture<ProductListComponent>,
        component: ProductListComponent,
        debugElement: DebugElement,
        products: IProduct[] = [],
        productService: any;

    beforeEach(() => {
        const productServiceStub = jasmine.createSpyObj('ProductService', ['getProducts']);

        TestBed.configureTestingModule({
            declarations: [
                ProductListComponent,
                ConvertToSpacesPipe
            ],
            providers: [
                { provide: ProductService, useValue: productServiceStub }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        });

        products = getProducts();
        productService = TestBed.inject(ProductService);
        productService.getProducts.and.returnValue(of(products));

        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create the app and call getProducts method during initialization', () => {
        expect(component).toBeTruthy();
        expect(productService.getProducts).toHaveBeenCalledTimes(1);

        //filteredProducts holds all products as filterBy is empty during initializtion
        expect(component.filteredProducts).toEqual(products);
    });

    it('should have the page Title - Product List', () => {
        expect(component.pageTitle).toEqual('Product List');
    });

    it('should toggle the button text when the toggle button is clicked', () => {
        component.showImage = false;
        var toggleButton = debugElement.nativeElement.querySelector('button');

        toggleButton.click();
        fixture.detectChanges();

        expect(component.showImage).toBeTrue();
        expect(toggleButton.textContent).toEqual(' Hide Image ');
    });

    it('should perform filter when listFilter value is set', () => {
        const filterBy = 'Leaf';
        var filteredProducts = products.filter((product) =>
            product.productName.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
        );

        component.listFilter = filterBy;
        fixture.detectChanges();

        expect(component.filteredProducts).toEqual(filteredProducts);
    });

    it('should return filtered product list when performFilter method is called', () => {
        const filterBy = 'Leaf';
        var filteredProducts = products.filter((product) =>
            product.productName.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
        );

        var response = component.performFilter(filterBy);

        expect(response).toEqual(filteredProducts);
    });

    describe('ProductsTable', () => {
        it('should display table if products list is not empty', () => {
            productService.getProducts.and.returnValue(of(products));
            component.ngOnInit();
            fixture.detectChanges();

            var table = debugElement.nativeElement.querySelector('table');

            expect(table).toBeTruthy();
        });

        it('should not display table if products list is empty', () => {
            component.products = [];
            fixture.detectChanges();

            var table = debugElement.nativeElement.querySelector('table');

            expect(table).toBeFalsy();
        });

        it('should display product code in lowercase and with spaces instead of hyphen', () => {
            var element = debugElement.nativeElement.querySelector('table>tbody tr:nth-child(1) td:nth-child(3)');

            const expected = products[0].productCode.toLocaleLowerCase().replace('-', ' ');

            expect(element.textContent).toEqual(expected);
        });

        it('should display the releaseDate in shortDate format', () => {
            var pipe = new DatePipe('en-US');
            const formattedDate = pipe.transform(products[0].releaseDate, 'shortDate');

            var element = debugElement.nativeElement.querySelector('table>tbody tr:nth-child(1) td:nth-child(4)');

            expect(element.textContent).toEqual(formattedDate);
        });

        it('should display the currency in USD format', () => {
            var pipe = new CurrencyPipe('en-US');
            const formattedDate = pipe.transform(products[0].price, 'USD', 'symbol', '1.2-2');

            var element = debugElement.nativeElement.querySelector('table>tbody tr:nth-child(1) td:nth-child(5)');

            expect(element.textContent).toEqual(formattedDate);
        });

        it('should display the product image if showImage value is false', () => {
            component.showImage = true;
            fixture.detectChanges();

            var image = debugElement.nativeElement.querySelector('img');

            expect(image).toBeDefined();
        });

        it('should hide the product image if showImage value is false', () => {
            component.showImage = false;
            fixture.detectChanges();

            var image = debugElement.nativeElement.querySelector('img');

            expect(image).toBeNull();
        });
    });

    describe('NgClassMethods', () => {
        it('should return className as highly-priced when given product price is greater than 30', () => {
            var product = products[0];
            product.price = 35;

            var response = component.getClassForPrice(product);

            expect(response).toEqual(['highly-priced']);
        });

        it('should return empty array when given product price is less than or equal to 30', () => {
            var product = products[0];
            product.price = 30;

            var response = component.getClassForPrice(product);

            expect(response).toEqual([]);
        });
    });

    describe('NgStyleMethods', () => {
        it('should return style object with color green and font-weight as bold when product\'s star rating is greater than 4', () => {
            var product = products[0];
            product.starRating = 5;
            var expected = { color: 'green', fontWeight: 'bold' };

            var response = component.getStyleForProductName(product);

            expect(response).toEqual(expected);
        });

        it('should return empty object when product\'s star rating is less than or equal to 4', () => {
            var product = products[0];
            product.starRating = 4;

            var response = component.getStyleForProductName(product);

            expect(response).toEqual({});
        });
    });
});

function getProducts() {
    var productArray = <IProduct[]>testObject;
    var products = [];
    for (let i = 0; i < productArray.length; i++) {
        products.push(productArray[i]);
    };

    return products;
}

