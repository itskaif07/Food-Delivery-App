import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import gsap from 'gsap';
import { LoaderComponent } from "./Shared/component/loader/loader.component";
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Food_Delivery_App_Frontend';

  constructor(private router: Router) {}

  authService = inject(AuthService)

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }


  onMenuClick(){
    gsap.to('#overlay',{
      duration:0.5,
      x:0,
      ease:'power1.inOut'
    }
    )
  }

  onXClick(){
    gsap.to('#overlay',{
      duration:0.5,
      x:'100%',
      ease:'back'
    }
    )
  }
}
