import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'] 
})
export class LocationsComponent implements OnInit {
  locations: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getLocationData();
  }

  getLocationData(): void {
    this.apiService.getLocations()
      .then(data => {
        if (data.status === 200) {
          this.locations = data.data;
        } else {
          console.error('No locations found or error status:', data.status);
        }
      })
      .catch(error => {
        console.error('Error fetching locations', error);
    });
  }
}
