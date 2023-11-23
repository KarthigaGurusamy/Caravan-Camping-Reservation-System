import { Camping } from './camping';
import { Staff } from './staff';

export interface Location {
  id: number;
  address: String;
  campingId:number;
  caravanName: String;
  caravanCapacity: number;
  price: number;
  stayCount: number;
  staff?:Staff;
}
