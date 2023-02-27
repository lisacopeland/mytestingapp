import { Component, OnInit } from '@angular/core';
import { DogResponse, DogsService } from './dogs.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mytestingapp';
  dogImageUrl = '';

  constructor(private dogService: DogsService) {}

  ngOnInit() {
    this.getDogImage();
  }

  onButtonClick() {
    this.getDogImage();
  }

  getDogImage() {
    this.dogService.get().subscribe((response: DogResponse) => {
      // Do something with response
      console.log('got a response ', response);
      this.dogImageUrl = response.message;
    });

  }
}
