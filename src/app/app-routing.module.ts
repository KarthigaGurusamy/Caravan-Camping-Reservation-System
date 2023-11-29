import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LocationComponent } from './components/location/location.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { AdmincampingComponent } from './components/admincamping/admincamping.component';
import { AdminlocationComponent } from './components/adminlocation/adminlocation.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { UserbookingsComponent } from './components/userbookings/userbookings.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { StaffComponent } from './components/staff/staff.component';
import { BookingformComponent } from './components/bookingform/bookingform.component';
import { CampingsComponent } from './components/campings/campings.component';
import { authGuard } from './guard/auth.guard';
import { AdminuserdetailsComponent } from './components/adminuserdetails/adminuserdetails.component';
import { NotloggedinComponent } from './components/notloggedin/notloggedin.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'campings',component:CampingsComponent, canActivate: [authGuard]},
  {path:'location',component:LocationComponent, canActivate: [authGuard]},
  {path:'admin/home',component:AdminpageComponent, canActivate: [authGuard]},
  {path:'user/home',component:UserpageComponent, canActivate: [authGuard]},
  {path:'admin/campings',component:AdmincampingComponent, canActivate: [authGuard]},
  {path:'admin/locations',component:AdminlocationComponent, canActivate: [authGuard]},
  {path:'admin/bookings',component:BookingsComponent, canActivate: [authGuard]},
  {path:'user/bookings',component:UserbookingsComponent, canActivate: [authGuard]},
  {path:'user/profile',component:UserprofileComponent, canActivate: [authGuard]},
  {path:'admin/staff',component:StaffComponent, canActivate: [authGuard]},
  {path:'admin/user-details',component:AdminuserdetailsComponent, canActivate: [authGuard]},
  {path:'user/booking/form',component:BookingformComponent},
  {path:'loggedin',component:NotloggedinComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
