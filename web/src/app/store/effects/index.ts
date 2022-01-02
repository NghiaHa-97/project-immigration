import { RouterEffects } from './router.effect';
import {AuthEffect} from './auth.effect';
import {EmployeeEffect} from './employee.effect';
import {ExpertsEffect} from './experts.effect';
import {ProfileEffect} from './profile.effect';

export const effectsRoot: any[] = [RouterEffects, AuthEffect];
export const effectsFeatures: any[] = [EmployeeEffect, ExpertsEffect, ProfileEffect];

export * from './router.effect';
