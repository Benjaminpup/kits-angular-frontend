import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SiteComponent } from './site/site.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { ProtocolRegistrationComponent} from './protocol-registration/protocol-registration.component';
import { SponsorGridComponent } from './sponsor-grid/sponsor-grid.component';
import { AddSiteComponent } from './add-site/add-site.component';
import { LabCreateComponent } from './lab-create/lab-create.component';
import { MaterialComponent } from './material/material.component';
import { VisitComponent } from './visit/visit.component';
import { ProtocolViewComponent } from './protocol-view/protocol-view.component';
import { ProtocolGridComponent } from './protocol-grid/protocol-grid.component';
import { EditProtocolComponent } from './edit-protocol/edit-protocol.component';
import { LabTestCreateComponent } from './lab-test-create/lab-test-create.component';
import { LabCreateGridComponent } from './lab-create-grid/lab-create-grid.component';


const routes: Routes = [
 
  {path:'siteGrid', component:SiteComponent},
  {path: 'addSite', component:AddSiteComponent},
  {path: 'updateSite/:id/:val', component:AddSiteComponent},

  {path:'labTestGrid', component:LabTestComponent},
  {path:'labTestgrid', component:LabTestComponent},
  {path: 'createLabTest', component:LabCreateComponent},
  {path: 'createlabtest', component:LabTestCreateComponent},
  {path: 'labGrid', component:LabCreateGridComponent},
  {path:'updateLabTest/:id/:val', component:LabCreateComponent},
  {path:'updatecLabTest/:id/:val', component:LabTestCreateComponent},
  

  {path:'csponsor', component:SponsorComponent},
  {path:'sponsorGrid', component:SponsorGridComponent},
  {path:'csponsorUpdate/:id/:val', component:SponsorComponent},

  {path:'protocolRegistration', component:ProtocolRegistrationComponent},
  {path:'dashboards', component:MaterialComponent},
  {path:'visits', component:VisitComponent},
  {path:'protocolView/:id/:type', component:ProtocolViewComponent},
  {path:'protocolGrid', component:ProtocolGridComponent},
  {path:'protocolUpdate/:id', component:EditProtocolComponent},
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRORoutingModule { }
