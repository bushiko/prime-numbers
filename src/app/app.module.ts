import { BrowserModule } from '@angular/platform-browser';
import { 
  FormsModule, 
  ReactiveFormsModule 
}   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// components
import { NotificationComponent } from './components/notification/notification.component';
import { MainComponent } from './components/main/main.component';

// services
import { PrimeNumbersService } from './services/PrimeNumbersService';

@NgModule({
  declarations: [
    NotificationComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [PrimeNumbersService],
  bootstrap: [MainComponent],
})
export class AppModule { }
