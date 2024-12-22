import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { RestaurantslistComponent } from './Components/restaurant/restaurantslist/restaurantslist.component';
import { AddrestaurantComponent } from './Components/restaurant/addrestaurant/addrestaurant.component';
import { EditrestaurantComponent } from './Components/restaurant/editrestaurant/editrestaurant.component';
import { DeleterestaurantComponent } from './Components/restaurant/deleterestaurant/deleterestaurant.component';


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
    ];
