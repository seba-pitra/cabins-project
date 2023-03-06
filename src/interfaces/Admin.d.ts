//Interface to Schema
export interface Admin {
  // Properties ordered by alphabetic order
  email:    string;
  type:     "Admin";
  name:     string;
  password: string; //JWT
}