  
import { schema } from 'normalizr';


export const link = new schema.Entity(
  'links',
);
export const links = new schema.Array(link);