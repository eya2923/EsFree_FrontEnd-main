export class User {
    id!: number;
    email!: string;
    password!: string;
    role!: string;
    image!: string ;
    phoneNumber!: number;
    enabled!: boolean;
    name !: string;
    authorities!: Authority[];
    accountNonLocked!: boolean;
    credentialsNonExpired!: boolean;
    accountNonExpired!: boolean;
  }
  
  interface Authority {
    authority: string;
  }

  export enum role {
    ADMIN = 'ADMIN',
    USER = 'USER'
  } 
  