import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatFormFieldModule ,MatInputModule,MatDialogModule, MatTableModule, MatIconModule  } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthServiceService } from './auth-service.service';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule ,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule
  ],
  providers: [
    AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
