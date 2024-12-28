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

    ];
