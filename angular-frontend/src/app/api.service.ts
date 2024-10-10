import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiLocUrl = 'http://localhost:8000/locations.php';
  private apiMenuUrl = 'http://localhost:8000/menu.php';

  constructor() { }

    getLocations(): Promise<any> {
      return axios.get(this.apiLocUrl)
        .then(response => response.data)
        .catch(error => {
          console.error('Error fetching locations from API', error);
          throw error;
      });
    }

    getMenu(): Promise<any> {
      return axios.get(this.apiMenuUrl)
        .then(response => response.data)
        .catch(error => {
          console.error('Error fetching locations from API', error);
          throw error;
      });
    }
}
