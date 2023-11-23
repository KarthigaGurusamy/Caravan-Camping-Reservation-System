import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LocationComponent } from './components/location/location.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { AdmincampingComponent } from './components/admincamping/admincamping.component';
import { AdminlocationComponent } from './components/adminlocation/adminlocation.component';
import { CampingformComponent } from './components/campingform/campingform.component';
import { LocationformComponent } from './components/locationform/locationform.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { UserbookingsComponent } from './components/userbookings/userbookings.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { StaffComponent } from './components/staff/staff.component';
import { StaffformComponent } from './components/staffform/staffform.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'gallery',component:GalleryComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'location',component:LocationComponent},
  {path:'adminhome',component:AdminpageComponent},
  {path:'userhome',component:UserpageComponent},
  {path:'admincampings',component:AdmincampingComponent},
  {path:'adminlocations',component:AdminlocationComponent},
  {path:'campingform',component:CampingformComponent},
  {path:'locationform',component:LocationformComponent},
  {path:'bookings',component:BookingsComponent},
  {path:'userbookings',component:UserbookingsComponent},
  {path:'profile',component:UserprofileComponent},
  {path:'staff',component:StaffComponent},
  {path:'staffform',component:StaffformComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
