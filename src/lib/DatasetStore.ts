import { writable, type Writable } from 'svelte/store';
import type { dataset } from './DatasetType';

export const item: Writable<dataset | null> = writable(null);
