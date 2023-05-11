import { Funko } from './funko.js';
export type Color = 'green' | 'yellow' | 'blue' | 'red' | 'magenta';
export type Note = {
    title: string;
    body: string;
    color: Color;
};
export type RequestType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    user: string;
    funkoPop?: Funko;
};
export type ResponseType = {
    type: 'add' | 'remove' | 'read' | 'list';
    success: boolean;
    notes?: Note[];
};
