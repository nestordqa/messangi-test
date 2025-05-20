import { Component } from '@angular/core';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserPreviewComponent } from '../../components/user-preview/user-preview.component';
import { MessageSenderComponent } from '../../components/message-sender/message-sender.component';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, UserListComponent, UserPreviewComponent, MessageSenderComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    selectedUser: User | null = null;

    onUserSelected(user: User) {
        this.selectedUser = user;
    }
}