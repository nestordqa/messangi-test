import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SmsService } from '../../services/sms.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	registerForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private smsService: SmsService,
		private router: Router,
		private toastr: ToastrService
	) {
		this.registerForm = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(3)]],
			phone: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
			email: ['', [Validators.required, Validators.email]],
			experience: ['', [Validators.required, Validators.min(0)]],
			description: ['', Validators.required]
		});
	}

	onSubmit() {
		if (this.registerForm.valid) {
			const newUser: User = {
				id: Date.now().toString(),
				...this.registerForm.value,
				avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
			};

			this.userService.addUser(newUser);
			
			// Enviar mensaje de bienvenida
			const welcomeMessage = `Hola ${newUser.name}, bienvenido a nuestra plataforma!`;
			this.smsService.sendSms(newUser.phone, welcomeMessage).subscribe({
				next: () => {
					this.toastr.success('Usuario registrado y mensaje de bienvenida enviado');
					this.router.navigate(['/']);
				},
				error: () => {
					this.toastr.success('Usuario registrado, pero no se pudo enviar el mensaje de bienvenida');
					this.router.navigate(['/']);
				}
			});
		}
	}

	goBack() {
		this.router.navigate(['/']);
	}
}