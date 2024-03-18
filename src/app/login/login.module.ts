import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [LoginRoutingModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
