import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { RegisterComponent } from './components/register/register.component';
import { LocationComponent } from './components/location/location.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { AdmincampingComponent } from './components/admincamping/admincamping.component';
import { AdminlocationComponent } from './components/adminlocation/adminlocation.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UserbookingsComponent } from './components/userbookings/userbookings.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { UsernavComponent } from './components/usernav/usernav.component';
import { StaffComponent } from './components/staff/staff.component';
import { BookingformComponent } from './components/bookingform/bookingform.component';
import { CampingsComponent } from './components/campings/campings.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminuserdetailsComponent } from './components/adminuserdetails/adminuserdetails.component';
import { NotloggedinComponent } from './components/notloggedin/notloggedin.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LocationComponent,
    AdminpageComponent,
    UserpageComponent,
    AdmincampingComponent,
    AdminlocationComponent,
    AdminnavComponent,
    UserbookingsComponent,
    BookingsComponent,
    UserprofileComponent,
    NavbarComponent,
    UsernavComponent,
    StaffComponent,
    BookingformComponent,
    CampingsComponent,
    PaymentComponent,
    AdminuserdetailsComponent,
    NotloggedinComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
