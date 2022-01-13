import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoMaterialModule} from '../demo-material-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartistModule} from 'ng-chartist';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonComponentModule} from '../common-component/common-component.module';
import {RouterModule} from '@angular/router';
import {PageRoutes} from './page-component.routing';
import {EmployeeComponent} from './employee-component/employee.component';
import {EmployeeUpdateComponent} from './employee-component/employee-update.component';
import {ExpertsComponent} from './experts-component/experts.component';
import {ExpertsUpdateComponent} from './experts-component/experts-update.component';
import {ProfileComponent} from './profile-component/profile.component';
import {ProfileUpdateComponent} from './profile-component/profile-update.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {effectsFeatures} from '../store';
import {featuresReducers} from '../store';
import {pageComponentService} from '../services';
import {canActives} from './can-activate';
import {MapComponent} from './map-component/map.component';


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule,
    RouterModule.forChild(PageRoutes),
    StoreModule.forFeature('features', featuresReducers),
    EffectsModule.forFeature(effectsFeatures),
  ],
  declarations: [
    EmployeeComponent,
    EmployeeUpdateComponent,
    ExpertsComponent,
    ExpertsUpdateComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    MapComponent
  ],
  providers: [
    ...pageComponentService,
    ...canActives
  ]
})
export class PageComponentModule {
}
