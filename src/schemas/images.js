  
import { schema } from 'normalizr';


export const image = new schema.Entity(
  'images',
);
export const images = new schema.Array(image);