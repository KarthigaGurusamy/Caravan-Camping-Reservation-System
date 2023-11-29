import { FileType } from './FileType';
import { Camping } from './camping';
import { Staff } from './staff';

export interface Location {
  id: number;
  address: String;
  name:String;
  campingId:number;
  caravanName: String;
  caravanCapacity: number;
  price: number;
  stayCount: number;
  staff?:Staff;
  camping:Camping;
  photo?: FileType,
  
}
