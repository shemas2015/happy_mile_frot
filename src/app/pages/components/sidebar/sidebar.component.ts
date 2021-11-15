import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/citas', title: 'Citas',  icon: 'event', class: '' },
  { path: '/doctores', title: 'Doctores',  icon: 'people', class: '' },
  { path: '/pacientes', title: 'Pacientes',  icon: 'sick', class: '' },
  { path: '/tratamientos', title: 'Tratamientos',  icon: 'description', class: '' },
  { path: '/doctores/out', title: 'Cerrar sesión',  icon:'exit_to_app', class: 'active-pro'  },
  
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
