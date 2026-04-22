import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SampleCollectionComponent } from './sample-collection/sample-collection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabView, TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ViewSitesComponent } from './view-sites/view-sites.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewsitesSortPipe } from './view-sites.sort';
import { StudySiteacknowledgementComponent } from './study-siteacknowledgement/study-siteacknowledgement.component';
import { NewkitsComponent } from './newkits/newkits.component';
import { KitsnewComponent } from './kitsnew/kitsnew.component';
import { DialogModule } from 'primeng/dialog';
import { InputRestrictionDirective } from '../input-restriction.directive';


@NgModule({
  declarations: [
    SampleCollectionComponent,
    ViewSitesComponent,
    ViewsitesSortPipe,
    StudySiteacknowledgementComponent,
    NewkitsComponent,
    KitsnewComponent,
    InputRestrictionDirective
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabViewModule,
    CardModule,
    ToastModule,
    NgxPaginationModule,
    DialogModule

  ], exports:[InputRestrictionDirective]
})
export class SiteModule { }
