import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  userModel = {
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    favorite: false,
  };

  onSubmit() {
    console.log('Form Submitted:', this.userModel);
    // Reset form after successful submission
    setTimeout(() => {
      this.userModel = {
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        favorite: false,
      };
    }, 1500);
  }
}