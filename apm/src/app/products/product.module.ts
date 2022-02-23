import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailGuard } from './product-detail.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './product.service';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: ':id',
    component: ProductDetailComponent,
    canActivate: [ProductDetailGuard]
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ConvertToSpacesPipe,
    ProductDetailComponent,
  ],
    imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    ProductService,
    ProductDetailGuard
   ],
  exports: [RouterModule]
})
export class ProductModule { }
