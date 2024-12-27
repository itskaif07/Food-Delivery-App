import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MenuServiceService } from '../../../Services/menu-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderService } from '../../../Shared/service/loader.service';

@Component({
  selector: 'app-menulist',
  imports: [RouterLink],
  templateUrl: './menulist.component.html',
  styleUrl: './menulist.component.css'
})
export class MenulistComponent implements OnInit {

  menuService = inject(MenuServiceService)
  activeRoute = inject(ActivatedRoute)
  loader = inject(LoaderService)

  menuList:any [] = []
  restaurentId:number = 0; 

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params =>{
      this.restaurentId = +params.get('restaurentId')!
      console.log(this.restaurentId)
    })

    this.getList()
  }

  getList(){
    this.loader.showLoader()
    this.menuService.getAllMenu(this.restaurentId).subscribe((res:any)=>{
      this.menuList = res
      this.loader.hideLoader()
    }, err =>{
      console.log("error", err)
    })
  }

}
