import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRORoutingModule } from './cro-routing.module';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SiteComponent } from './site/site.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { ProtocolRegistrationComponent } from './protocol-registration/protocol-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SponsorGridComponent } from './sponsor-grid/sponsor-grid.component';
import { AddSiteComponent } from './add-site/add-site.component';
import { LabCreateComponent } from './lab-create/lab-create.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialComponent } from './material/material.component';
import {PickListModule} from 'primeng/picklist';
import {ChipsModule} from 'primeng/chips';
import {MultiSelectModule} from 'primeng/multiselect';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import { VisitComponent } from './visit/visit.component';
import {TabViewModule} from 'primeng/tabview';
import {AccordionModule} from 'primeng/accordion';
import { ProtocolViewComponent } from './protocol-view/protocol-view.component';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { ProtocolGridComponent } from './protocol-grid/protocol-grid.component';
import {DataViewModule} from 'primeng/dataview';
import { EditProtocolComponent } from './edit-protocol/edit-protocol.component';
import {CalendarModule} from 'primeng/calendar';
import { LabTestCreateComponent } from './lab-test-create/lab-test-create.component';
import { LabCreateGridComponent } from './lab-create-grid/lab-create-grid.component';
import { CroSortPipe } from './crosort';
// import { TopCardsComponent } from '../top-cards/top-cards.component'; 


@NgModule({
  declarations: [
    SponsorComponent,
    SiteComponent,
    LabTestComponent,
    ProtocolRegistrationComponent,
    SponsorGridComponent,
    AddSiteComponent,
    LabCreateComponent,
    MaterialComponent,
    VisitComponent,
    ProtocolViewComponent,
    ProtocolGridComponent,
    EditProtocolComponent,
    LabTestCreateComponent,
    LabCreateGridComponent,
     CroSortPipe,
    //  TopCardsComponent
    
    
    
  ],
  imports: [

    CommonModule,
    CRORoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    PickListModule,
    ChipsModule,
    MultiSelectModule,
    DialogModule,
    CardModule,
    TabViewModule,
    AccordionModule,
    ToastModule,
    ChartModule,
    DataViewModule,
    CalendarModule
    
  ]
})
export class CROModule { }
