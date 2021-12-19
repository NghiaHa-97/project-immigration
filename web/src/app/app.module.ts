
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import {AppComponent} from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
// =====END======
import {MetaReducer, StoreModule} from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import {CustomSerializer, routerReducer, reducers, effectsFeatures, effectsRoot} from "./store";
import {RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import {LoginComponent} from "./auth-component/login/login.component";
import {RegisterComponent} from "./auth-component/register/register.component";
import {AppRequestInterceptor} from "./interceptors/app.request.interceptor";

const environment = {
  development: true,
  production: false,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    StoreModule.forRoot(routerReducer, {metaReducers}),
    StoreModule.forFeature('user', reducers),
    EffectsModule.forRoot(effectsRoot),
    EffectsModule.forFeature(effectsFeatures),
    StoreRouterConnectingModule.forRoot(),
    environment.development ? StoreDevtoolsModule.instrument() : [],
  ],

  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AppRequestInterceptor,
      multi : true
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
