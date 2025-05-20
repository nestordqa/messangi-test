import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user';

@Component({
    selector: 'app-user-preview',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    templateUrl: './user-preview.component.html',
    styleUrls: ['./user-preview.component.scss']
})
export class UserPreviewComponent {
    @Input() user: User | null = null;
}