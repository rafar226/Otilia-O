import { NgModule } from '@angular/core';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [RegisterRoutingModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
