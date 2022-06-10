import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/users/user.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  public ngOnInit(): void {
    this.userService.fetchUsers().subscribe((res) => console.log(res));
  }
}
