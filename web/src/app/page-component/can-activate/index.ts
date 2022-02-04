import {EmployeeExistDetailActivate} from './employee-exist-detail.activate';
import {RoleExistDetailActivate} from './role-exist-detail.activate';
import {UserCustomerExistDetailActivate} from './user-customer-exist-detail.activate';


export * from './employee-exist-detail.activate';

export const canActivate = [
  EmployeeExistDetailActivate,
  RoleExistDetailActivate,
  UserCustomerExistDetailActivate
];
