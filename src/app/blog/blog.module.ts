import { NgModule } from '@angular/core';
import { BlogComponent } from './blog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [BlogComponent],
  declarations: [BlogComponent],
  providers: [],
})
export class BlogModule { }
