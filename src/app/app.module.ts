import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { DonutComponent } from './components/donut/donut.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LineComponent } from './components/line/line.component';
import { PieComponent } from './components/pie/pie.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableExporterModule } from 'mat-table-exporter';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { StatBoxComponent } from './components/stat-box/stat-box.component';
import { SkillBoxComponent } from './components/skill-box/skill-box.component';
import { CalenderComponent } from './components/calender/calender.component';
import { SigninComponent } from './components/signin/signin.component';
import { RecruiterDashboardComponent } from './components/recruiter-dashboard/recruiter-dashboard.component';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { DragToSelectModule } from 'ngx-drag-to-select';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    MainPageComponent,
    ProfileCardComponent,
    StatBoxComponent,
    SkillBoxComponent,
    CalenderComponent,
    SigninComponent,
    RecruiterDashboardComponent,
    DonutComponent,
    LineComponent,
    PieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgChartsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    [DragToSelectModule.forRoot()],
    NgbModalModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule,
    FormsModule,
    FontAwesomeModule,
    MatTableExporterModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,
    SocialLoginModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide:'SocialAuthServiceConfig',
      useValue:{
        autoLogin:false,
        providers:[
          {
            id:GoogleLoginProvider.PROVIDER_ID,
            provider:new GoogleLoginProvider(
            '35889635519-07sm87fc83tr839dorbnkrtnbbb2fh7c.apps.googleusercontent.com'
            )
          }
        ]
      }as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent],
    
})

export class AppModule {}
