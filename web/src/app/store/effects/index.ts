import { RouterEffects } from './router.effect';
import {AuthEffect} from './auth.effect';

export const effectsRoot: any[] = [RouterEffects, AuthEffect];
export const effectsFeatures: any[] = [];

export * from './router.effect';
