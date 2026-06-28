import { activities } from './activities.js';
import * as store from './store.js';
import { renderBoard } from './board.js';
import { createCelebrator } from './celebrate.js';

await store.initStore();
renderBoard(document.getElementById('board'), activities, store);

const celebrate = createCelebrator(activities);
store.subscribe(doneIds => celebrate(doneIds));
