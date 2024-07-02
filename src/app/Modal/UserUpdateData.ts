import { UserS } from "./userS";

export class UserUpdateData {
    id!: number;
    email!: string;
    password!: string;
    name!: string;
    role!: string;
    image!: string;
    phoneNumber!: number;
  
    constructor(user: UserS) {
      this.id = user.id;
      this.email = user.email;
      this.password = user.password;
      this.name = user.name;
      this.role = user.role;
      this.image = user.image;
      this.phoneNumber = user.phoneNumber;
    }
  }
  