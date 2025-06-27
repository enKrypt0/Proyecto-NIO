import { Component } from '@angular/core';
import { supabase } from '../../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  imports: [FormsModule,RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export default class SignInComponent {

  email ='';
  password = '';
  remember = false;
  error = '';

  async onSubmit() {
    const { error } = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });
    if (error) {
      this.error = error.message;
    } else {
      // Redirect or perform other actions after successful sign-in
    }
  }
}
