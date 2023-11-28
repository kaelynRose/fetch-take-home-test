import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DogCardComponent } from './dog-card/dog-card.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DogCardHolderComponent } from './dog-card-holder/dog-card-holder.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatchComponent } from './match/match.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { LocationFilterComponent } from './location-filter/location-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DogCardComponent,
    LoginFormComponent,
    FilterBarComponent,
    HomeComponent,
    DogCardHolderComponent,
    MatchComponent,
    PaginatorComponent,
    LocationFilterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatGridListModule,
    MatCheckboxModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full'},
      { path: 'login', component: LoginFormComponent },
      { path: 'home', component: HomeComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
