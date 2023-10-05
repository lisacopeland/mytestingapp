import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { DogResponse, DogsService } from '../dogs.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dogImageUrl = '';
  constructor(
    private usersService: UsersService,
    private dogService: DogsService
  ) {}

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
