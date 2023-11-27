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

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'campings',component:CampingsComponent},
  {path:'location',component:LocationComponent},
  {path:'admin/home',component:AdminpageComponent},
  {path:'user/home',component:UserpageComponent},
  {path:'admin/campings',component:AdmincampingComponent},
  {path:'admin/locations',component:AdminlocationComponent},
  {path:'admin/bookings',component:BookingsComponent},
  {path:'user/bookings',component:UserbookingsComponent},
  {path:'user/profile',component:UserprofileComponent},
  {path:'admin/staff',component:StaffComponent},
  {path:'user/booking/form',component:BookingformComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
