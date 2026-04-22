import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth-gaurd.service';
import { ProtocolRegistrationComponent } from './cro/protocol-registration/protocol-registration.component';
import { MaterialComponent } from './cro/material/material.component';

const routes: Routes = [
{path:'',redirectTo:'login', pathMatch:'full'},
{path:'login',  component: LoginComponent},
{path:'header',  component:HeaderComponent},
{path:'material', component:MaterialComponent},
{path: 'home', component:HomeComponent,
children: [
{
  path: 'admin',
  loadChildren: ()=> import('./applicationadmin/applicationadmin.module').then(m=>m.ApplicationadminModule)
},
{
  path: 'Sponsor',
  loadChildren: ()=>import('./sponsor/sponsor.module').then(m=>m.SponsorModule)
},
{
  path: 'cro',
  loadChildren: ()=>import('./cro/cro.module').then(m=>m.CROModule)
},
{
  path: 'centralLab',
  loadChildren: ()=>import('./central-lab/central-lab.module').then(m=>m.CentralLabModule)
},
{
  path: 'site',
  loadChildren: ()=>import('./site/site.module').then(m=>m.SiteModule)
},


]
, canActivate: [AuthGuard]
}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
