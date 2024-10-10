import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  message: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    /*this.apiService.getAbout().then(response => {
      this.message = response.data.message;
    }).catch(error => {
      console.error('There was an error!', error);
    });*/
  }
}
