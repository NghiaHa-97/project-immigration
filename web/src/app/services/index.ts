import {EmployeeService} from './employee.service';
import {ExpertsService} from './experts.service';
import {ProfileService} from './profile.service';
import {AuthService} from './auth.service';

export * from './auth.service';
export * from './profile.service';
export * from './employee.service';
export * from './experts.service';

export const pageComponentService = [EmployeeService, ExpertsService, ProfileService];
export const appComponentService = [AuthService];

