/// <reference types="node" resolution-mode="require"/>
import { EventEmitter } from 'events';
export declare class MessageEventEmitterClient extends EventEmitter {
    constructor(connection: EventEmitter);
}
