  
import { schema } from 'normalizr';


export const video = new schema.Entity(
  'videos',
);
export const videos = new schema.Array(video);