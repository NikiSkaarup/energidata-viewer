import { writable, type Writable } from 'svelte/store';
import type { dataset } from './DatasetType';

export const name: Writable<dataset | null> = writable(null);
