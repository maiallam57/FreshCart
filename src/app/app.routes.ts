import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { NotfoundComponent } from './features/pages/notfound/notfound.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { ForgetPasswordComponent } from './core/auth/pages/forget-password/forget-password.component';
import { authGuard } from './core/guards/auth.guard';
import { unauthGuard } from './core/guards/unauth.guard';

export const routes: Routes = [
    { path: "", redirectTo: "register", pathMatch: "full" },
    { path: "register", component: RegisterComponent, title: "Register", canActivate: [unauthGuard] },
    { path: "login", component: LoginComponent, title: "Login", canActivate: [unauthGuard] },
    { path: "forgetPassword", component: ForgetPasswordComponent, title: "ForgetPassword", canActivate: [unauthGuard] },
    { path: "home", component: HomeComponent, title: "Home", canActivate: [authGuard] },
    { path: "cart", component: CartComponent, title: "Cart", canActivate: [authGuard] },
    { path: "products", component: ProductsComponent, title: "Products", canActivate: [authGuard] },
    { path: "categories", component: CategoriesComponent, title: "Categories", canActivate: [authGuard] },
    { path: "brands", component: BrandsComponent, title: "Brands", canActivate: [authGuard] },



    { path: "**", component: NotfoundComponent, title: "Not Found" }

];
