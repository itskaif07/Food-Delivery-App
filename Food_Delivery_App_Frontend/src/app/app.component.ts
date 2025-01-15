import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import gsap from 'gsap';
import { LoaderComponent } from "./Shared/component/loader/loader.component";
import { AuthService } from './Services/auth.service';
import { SearchService } from './Services/search.service';
import { FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, LoaderComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Food_Delivery_App_Frontend';

  router = inject(Router)
  authService = inject(AuthService)
  searchService = inject(SearchService)

  username: string = ''
  searchQuery: string = ''
  orderItems: number = 0
  cartItems: number = 0

  searchedList: any = []

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  ngOnInit(): void {
    this.scroller()
    this.authService.user$.subscribe((user) => {
      if (user) {
        console.log(user)
        this.username = this.authService.userSubject.value.displayName
      }
    })
  }

  itemsList(query: string) {
    console.log('Calling service with query:', query);
    if (!query.trim()) {
      this.searchedList = []
      return;
    }

    if (query == '') {
      this.searchedList = []
      return;
    }


    this.searchService.getSearchedList(query).pipe(
      debounceTime(500)
    )
      .subscribe((res: any) => {
        console.log("Fetch successful", res);
        this.searchedList = res;
        console.log(this.searchedList)
      }, error => {
        console.log("Some error while fetching results", error);
      });
  }

  navigateRoute(menuId: number, restaurentId: number) {
    this.searchedList = []; 
    this.router.navigate(['/menu-details', restaurentId, menuId]); // Then navigate
  }
  

  onMenuClick() {
    gsap.to('#overlay', {
      duration: 0.5,
      x: 0,
      ease: 'power1.inOut'
    }
    )
  }

  onXClick() {
    gsap.to('#overlay', {
      duration: 0.5,
      x: '100%',
      ease: 'back'
    }
    )
  }

  onRouteClick() {
    gsap.to('#overlay',
      {
        duration: 0.5,
        x: '100%',
        ease: 'sine'
      }
    )
  }

  scroller() {
    gsap.to('#searchResults', {
      scrollTrigger: {
        trigger: '#searchResults',   
        scroller: '.container',       
        start: "top center",          
        end: "bottom top",            
        markers: true,               
        scrub: true, 
      },
      ease: 'elastic.inOut',
      opacity: 1,
    });
  }

}
