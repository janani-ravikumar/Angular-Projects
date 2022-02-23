import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
    },
    {
        path: 'products',
        loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
    },
    {
        path: 'products/:id',
        loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: 'user/edit',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule)
    },
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'welcome',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }