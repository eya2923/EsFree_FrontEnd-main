import { PubItem } from './pubitem'; 
import { User } from './user'; 

export class Cart {
  id!: number;
  total!: number;
  user!: User;
  pubItems!: PubItem[];
}