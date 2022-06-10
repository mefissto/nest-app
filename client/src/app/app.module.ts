import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderInterceptor } from './core/interceptors/header.interceptor';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, CoreModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
