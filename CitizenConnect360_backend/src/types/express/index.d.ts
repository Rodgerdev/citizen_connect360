import { User } from '../Models/AuthModel';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
