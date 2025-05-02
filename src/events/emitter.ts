import {EventEmitter} from "node:events";


export const emitter = new EventEmitter();

emitter.on('product_added', () => console.log('product was successfully added'));
emitter.on('product_removed', () => console.log('product was removed'));
emitter.on('product_upd', () => console.log('product was updated'));

