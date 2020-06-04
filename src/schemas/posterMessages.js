  
import { schema } from 'normalizr';


export const posterMessage = new schema.Entity(
  'posterMessages',
);
export const posterMessages = new schema.Array(posterMessage);