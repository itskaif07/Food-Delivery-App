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


export const routes: Routes =
    [
        {
            path:"",
            redirectTo:"home",
            pathMatch:"full"
        },
        {
            path: "home",
            component: HomeComponent
        },
        {
            path: "Restaurants-list",
            component: RestaurantslistComponent
        },
        {
            path: "add-Restaurant",
            component: AddrestaurantComponent
        },
        {
            path: "edit-Restaurant",
            component: EditrestaurantComponent
        },
        {
            path: "delete-Restaurant",
            component: DeleterestaurantComponent
        },
        {
            path: "menu-list",
            component: MenulistComponent
        },
        {
            path: "add-menu",
            component: AddMenuComponent
        },
        {
            path: "edit-menu",
            component: EditMenuComponent
        },
        {
            path: "delete-menu",
            component: DeleteMenuComponent
        },
    ];
