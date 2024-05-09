import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../shared/loader';
import { SidebarDownComponent } from './components/sidebar-down/sidebar-down.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    LayoutRoutingModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderComponent,
    RouterModule
  ],
  declarations: [LayoutComponent, SidebarComponent, SidebarDownComponent, HeaderComponent],
  providers: [],
})
export class LayoutModule {}
