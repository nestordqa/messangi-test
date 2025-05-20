import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})

//Service for all users logic
export class UserService {
    private readonly STORAGE_KEY = 'sms_sender_users';

    constructor() { }

    //Users getter
    getUsers(): User[] {
        const users = localStorage.getItem(this.STORAGE_KEY);
        return users ? JSON.parse(users) : this.getDefaultUsers();
    }

    //User post
    addUser(user: User): void {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }

    //Get default users for testing
    private getDefaultUsers(): User[] {
        return [
            {
                id: '1',
                name: 'Nestor Quinones',
                phone: '584241385416',
                email: 'nestordqa@example.com',
                experience: 5,
                description: 'Desarrollador Frontend con experiencia en Angular, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                avatar: 'https://ui-avatars.com/api/?name=Nestor+Quinones'
            },
            {
                id: '2',
                name: 'Valentina Moreno',
                phone: '584241234568',
                email: 'valentinam@example.com',
                experience: 3,
                description: 'Diseñadora UX/UI, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                avatar: 'https://ui-avatars.com/api/?name=Valentina+Moreno'
            }
        ];
    }
}