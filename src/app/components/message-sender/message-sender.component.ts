import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SmsService } from '../../services/sms.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';

@Component({
    selector: 'app-message-sender',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
    templateUrl: './message-sender.component.html',
    styleUrls: ['./message-sender.component.scss']
})
export class MessageSenderComponent {
    @Input() user: User | null = null;
    message: string = '';

    constructor(
        private smsService: SmsService,
        private toastr: ToastrService
    ) { }

    sendMessage() {
        if (!this.user || !this.message.trim()) {
            this.toastr.error('Selecciona un usuario y escribe un mensaje');
            return;
        }

        this.smsService.sendSms(this.user.phone, this.message).subscribe({
            next: () => {
                this.toastr.success('Mensaje enviado correctamente');
                this.message = '';
            },
            error: () => {
                this.toastr.error('Error al enviar el mensaje');
            }
        });
    }
}