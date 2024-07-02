export class UserS { 
    id !: number ;
    email!: string;
    password!: string;
    name !: string;
    role!: string;
    image!: string ;
    phoneNumber!: number;
}
  
export enum role {
    ADMIN = 'ADMIN',
    USER = 'USER'
  }
   