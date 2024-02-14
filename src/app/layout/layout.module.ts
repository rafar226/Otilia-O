import { NgModule } from '@angular/core';
import {
  NgbCarouselModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../shared/loader';

@NgModule({
  imports: [
    LayoutRoutingModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbCarouselModule,
    LoaderComponent
  ],
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent],
  providers: [],
})
export class LayoutModule {}
