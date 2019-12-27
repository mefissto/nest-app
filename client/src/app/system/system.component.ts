import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit {
  constructor(private readonly userDervice: UserService) {}

  ngOnInit() {
    this.userDervice.fetchUsers().subscribe(res => console.log(res));
  }
}
