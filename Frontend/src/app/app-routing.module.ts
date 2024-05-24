import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

import { DestinationDetailsComponent } from './destination-details/destination-details.component';
import { CartComponent } from './cart/cart.component';
import { LikesComponent } from './like/like.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {path:'register',component:RegisterComponent},
  { path: '', component:RegisterComponent},
  { path: 'destination/:id', component: DestinationDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'likes', component: LikesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
