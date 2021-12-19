import { RouterEffects } from './router.effect';
import {AuthEffect} from './auth.effect';

export const effectsRoot: any[] = [RouterEffects];
export const effectsFeatures: any[] = [AuthEffect];

export * from './router.effect';
