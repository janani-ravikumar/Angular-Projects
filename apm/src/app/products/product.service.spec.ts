import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing";
import { IProduct } from "./product";
import { ProductService } from "./product.service"
import * as productArray  from "src/assets/products.json";
import { HttpErrorResponse } from "@angular/common/http";

describe("ProductService", () => {
    let productService: ProductService,
        mockHttp: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ProductService
            ]
        });

        mockHttp = TestBed.inject(HttpTestingController);
        productService = TestBed.inject(ProductService);
    });

    afterEach(() => {
        mockHttp.verify();
    });

    describe("getProducts", () => {
        const productsUrl = 'assets/products.json';

        it("should get the list of products", () => {
           var products = <IProduct[]>productArray;
            productService.getProducts().subscribe((response) => {
                expect(response.length).toBe(products.length);
                expect(response).toEqual(products);
            });

            let request = mockHttp.expectOne(productsUrl);
            request.flush(productArray);
            expect(request.request.method).toBe("GET");
        });

        it('should throw error when service fails', () => {
            const errorResponse = new HttpErrorResponse({
                error: '404 error',
                status: 404,
                statusText: 'Not Found',
            });
            var expectedError = `Server returned code: 404, error message is: Http failure response for ${productsUrl}: 404 Not Found`;
            productService.getProducts().subscribe({
                next: () => fail('Should have failed with 404 error'),
                error: (error: string) => {
                    expect(error).toBe(expectedError);
                }
            });

            let request = mockHttp.expectOne(productsUrl);
            request.flush(errorResponse.error, errorResponse);
            expect(request.request.method).toBe("GET");
        });
    });
})