import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { RestaurantslistComponent } from './Components/restaurant/restaurantslist/restaurantslist.component';
import { AddrestaurantComponent } from './Components/restaurant/addrestaurant/addrestaurant.component';
import { EditrestaurantComponent } from './Components/restaurant/editrestaurant/editrestaurant.component';
import { DeleterestaurantComponent } from './Components/restaurant/deleterestaurant/deleterestaurant.component';
import { MenulistComponent } from './Components/menu/menulist/menulist.component';
import { AddMenuComponent } from './Components/menu/add-menu/add-menu.component';
import { EditMenuComponent } from './Components/menu/edit-menu/edit-menu.component';
import { DeleteMenuComponent } from './Components/menu/delete-menu/delete-menu.component';
import { RestaurantDetailsComponent } from './Components/restaurant/restaurant-details/restaurant-details.component';
import { MenuDetailsComponent } from './Components/menu/menu-details/menu-details.component';
import { SignupComponent } from './Components/auth/signup/signup.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { CartListComponent } from './Components/cart/cart-list/cart-list.component';
import { OrderListComponent } from './Components/order/order-list/order-list.component';
import { AddOrderComponent } from './Components/order/add-order/add-order.component';
import { EmailVerificationComponent } from './Components/auth/email-verification/email-verification.component';
import { DeleteOrderComponent } from './Components/order/delete-order/delete-order.component';
import { OrderDetailsComponent } from './Components/order/order-details/order-details.component';


export const routes: Routes =
    [
        {
            path: "",
            redirectTo: "home",
            pathMatch: "full"
        },
        {
            path: "home",
            component: HomeComponent
        },

        // Restaurent

        {
            path: "restaurants-list",
            component: RestaurantslistComponent
        },
        {
            path: "restaurant-details/:restaurentId",
            component: RestaurantDetailsComponent
        },
        {
            path: "add-Restaurant",
            component: AddrestaurantComponent
        },
        {
            path: "edit-Restaurant/:restaurentId",
            component: EditrestaurantComponent
        },
        {
            path: "delete-Restaurant/:restaurentId",
            component: DeleterestaurantComponent
        },

        // Menu

        {
            path: "menu-list/:restaurentId",
            component: MenulistComponent
        },
        {
            path: "add-menu/:restaurentId",
            component: AddMenuComponent
        },
        {
            path: "menu-details/:restaurentId/:menuId",
            component: MenuDetailsComponent
        },
        {
            path: "edit-menu/:restaurentId/:menuId",
            component: EditMenuComponent
        },
        {
            path: "delete-menu/:restaurentId/:menuId",
            component: DeleteMenuComponent
        },


        //Authentication

        {
            path: "sign-up",
            component: SignupComponent,
        },
        {
            path: "log-in",
            component: LoginComponent
        },
        {
            path: "email-ver",
            component: EmailVerificationComponent
        },
        

        // Cart

        {
            path: "cart-list",
            component: CartListComponent
        },

        // Order

        {
            path: "order-list",
            component: OrderListComponent
        },

        {
            path: 'add-order/:menuId/:restaurentId/:quantity?/:cartId?',
            component: AddOrderComponent
        },

        {
            path: 'add-order/:menuId/:restaurentId',
            component: AddOrderComponent
        },

        {
            path:'order-details/:orderId',
            component:OrderDetailsComponent
        },

        {
            path: 'delete-order/:orderId',
            component:DeleteOrderComponent
        },

        //Other

        {
            path: '**',
            redirectTo: '/'
        },

    ];
