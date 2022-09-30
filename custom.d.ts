declare namespace Express {
  export interface Request {
    user?: User;
  }
}

interface User {
  _id: string;
  tid: string;
  roles: string[];
}
