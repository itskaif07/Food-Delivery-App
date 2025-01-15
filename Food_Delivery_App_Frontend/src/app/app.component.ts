import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import gsap from 'gsap';
import { LoaderComponent } from "./Shared/component/loader/loader.component";
import { AuthService } from './Services/auth.service';
import { OrderService } from './Services/order.service';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Food_Delivery_App_Frontend';

  router = inject(Router)
  authService = inject(AuthService)
  orderService = inject(OrderService)
  cartService = inject(CartService)

  userId: string = ''
  orderItems: number = 0
  cartItems: number = 0
  orderList: any = []
  cartList: any = []
  username: string = ''

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        console.log(user)
        this.username = this.authService.userSubject.value.displayName
      }
    })
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

}
