import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { BlogComponent } from './blog/blog.component';
import { DataService } from './data.service';
import { LocalStorageService } from './local-storage.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsComponent,
    BlogComponent,
    NotFoundComponent
  ],
  providers: [
    DataService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
