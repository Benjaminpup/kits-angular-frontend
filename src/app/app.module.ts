import { ApplicationModule, Directive, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CROModule } from './cro/cro.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { HomeComponent } from './home/home.component';
import { UploadResultsComponent } from './central/upload-results/upload-results.component';
import { CentralLabModule } from './central-lab/central-lab.module';
import { SiteModule } from './site/site.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationadminModule } from './applicationadmin/applicationadmin.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast'
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InstructionsAppDirective } from './instructions-app.directive';
import { InputRestrictionDirective } from './input-restriction.directive';
import { SortPipe } from './sort.service';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
// import { TopCardsComponent } from './top-cards/top-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UploadResultsComponent,
    HeaderComponent,
    FooterComponent,
    // TopCardsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CalendarModule,
    SponsorModule,
    // CentralLabModule,
    // SiteModule,
    ReactiveFormsModule,
    TooltipModule,
    

    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule
    
 

  ],
  
  providers: [MessageService, ConfirmationService,SortPipe, {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
