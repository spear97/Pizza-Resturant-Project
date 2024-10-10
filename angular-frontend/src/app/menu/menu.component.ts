import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  activeTab: string = 'Pizza';
  menuItems: any[] = [];

  pizzaItems: any[] = [];
  pastaItems: any[] = [];
  starterItems: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    // Get the Menu Items for the Menu
    this.getMenuItems();

    // Set default tab to Pizza
    this.openMenu('Pizza');
  }

  getMenuItems(): void {
    this.apiService.getMenu()
      .then(data => {
        if (data.status === 200) {
          this.menuItems = data.data;

          this.pizzaItems = this.menuItems.filter(item => item.Food === 'Pizza');
          this.pastaItems = this.menuItems.filter(item => item.Food === 'Pasta');
          this.starterItems = this.menuItems.filter(item => item.Food === 'Starter');

        } else {
          console.error('No locations found or error status:', data.status);
        }
      })
      .catch(error => {
        console.error('Error fetching locations', error);
    });
  }

  openMenu(menuName: string): void {
    const menus = document.getElementsByClassName('menu');
    const tablinks = document.getElementsByClassName('tablink');

    // Hide all menu items
    for (let i = 0; i < menus.length; i++) {
      (menus[i] as HTMLElement).style.display = 'none';
    }

    // Remove red background from all tabs
    for (let i = 0; i < tablinks.length; i++) {
      (tablinks[i] as HTMLElement).classList.remove('w3-red');
    }

    // Show the selected menu
    (document.getElementById(menuName) as HTMLElement).style.display = 'block';

    // Add red background to the clicked tab
    const activeTabLink = Array.from(tablinks).find(tab => tab.textContent?.trim() === menuName);
    if (activeTabLink) {
      (activeTabLink as HTMLElement).classList.add('w3-red');
    }

    // Update the active tab
    this.activeTab = menuName;
  }

}
