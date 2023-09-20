import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  public sidebarItems = [
    {
      label: 'Perfil', icon: 'label', url: './perfil'
    }
  ]

  private authService = inject( AuthService );

  public user = computed( () => this.authService.currentUser());

  onLogout(){
    this.authService.logout();
  }

}
