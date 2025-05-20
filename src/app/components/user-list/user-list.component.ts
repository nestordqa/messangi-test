import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, RouterModule],
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
    users: User[] = [];
    @Output() userSelected = new EventEmitter<User>();

    constructor(private userService: UserService) {
        this.users = this.userService.getUsers();
    }

    selectUser(user: User) {
        this.userSelected.emit(user);
    }
}