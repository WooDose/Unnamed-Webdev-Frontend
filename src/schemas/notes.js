  
import { schema } from 'normalizr';


export const note = new schema.Entity(
  'notes',
);
export const notes = new schema.Array(note);