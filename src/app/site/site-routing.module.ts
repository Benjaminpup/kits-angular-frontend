import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleCollectionComponent } from './sample-collection/sample-collection.component';
import { ViewSitesComponent } from './view-sites/view-sites.component';
import { StudySiteacknowledgementComponent } from './study-siteacknowledgement/study-siteacknowledgement.component';
import { NewkitsComponent } from './newkits/newkits.component';

const routes: Routes = [
  {path:'sampleCollection/:id', component:SampleCollectionComponent},
  {path:'viewCRA', component:ViewSitesComponent},
  {path:'viewCRAAcknowledgement', component:ViewSitesComponent},
  {path:'viewcraAcknowledgement', component:ViewSitesComponent},
  {path:'viewSubject', component:ViewSitesComponent},
  {path:'labReports/:id', component:NewkitsComponent},
  {path:'newkits/:id', component:NewkitsComponent},
  {path:'inventory', component:NewkitsComponent},
  {path:'studySiteAcknowledgement/:id', component:StudySiteacknowledgementComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
