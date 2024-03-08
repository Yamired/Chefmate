import { Routes } from '@angular/router';

// Guards
import { authGuard } from '@shared/guards/auth.guard';

// App Layout
import { BaseLayout } from '@routes/base.layout';

// Page list
import { NotFoundPage } from '@routes/not-found/not-found.page';
import { LoginPage } from '@routes/auth/login/login.page';
import { ProfilePage } from '@routes/auth/profile/profile.page';
import { HomePage } from '@routes/home/home.page';
import { RecipesPage } from '@routes/recipes/recipes.page';
import { IngredientsPage } from '@routes/ingredients/ingredients.page';
import { CartPage } from '@routes/cart/cart.page';

export const routes: Routes = [
    { path: 'login', component: LoginPage },
    { path: '', component: BaseLayout, canActivate: [authGuard], children: [
        { path: '', redirectTo: 'home', pathMatch: 'full'},
        { path: 'recipes', component: RecipesPage },
        { path: 'ingredients', component: IngredientsPage },
        { path: 'cart', component: CartPage },
        { path: 'profile', component: ProfilePage },
        { path: 'home', component: HomePage },
        { path: '**', component: NotFoundPage },
    ]},
];

