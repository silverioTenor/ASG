import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoginGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  },
  { 
    path: 'details', 
    loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] 
  },
  { 
    path: 'details/:id', 
    loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] 
  },
  { 
    path: 'services', 
    loadChildren: './pages/services/services.module#ServicesPageModule', canActivate: [AuthGuard]
  },
  { 
    path: 'password', 
    loadChildren: './pages/password/password.module#PasswordPageModule', canActivate: [LoginGuard]
   },
  { 
    path: 'add-products', 
    loadChildren: './pages/add-products/add-products.module#AddProductsPageModule', canActivate: [AuthGuard] 
  },
  { 
    path: 'products', 
    loadChildren: './pages/products/products.module#ProductsPageModule', canActivate: [AuthGuard]  
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
