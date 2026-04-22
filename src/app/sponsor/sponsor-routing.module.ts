import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtocalComponent } from './protocal/protocal.component';
import { SponsorStudyComponent } from './sponsor-study/sponsor-study.component';

const routes: Routes = [
  {path:'protocol', component:ProtocalComponent},
  {path:'sponsorStudies', component:SponsorStudyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorRoutingModule { }
