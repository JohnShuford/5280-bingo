import { activities } from './activities.js';
import * as store from './store.js';
import { renderMap } from './map.js';

await store.initStore();
renderMap(document.getElementById('map'), activities, store);
