import { SignupDTO } from '../schemas/user.schema';
import { IUser } from '../interfaces/user.interface';
import { User } from '@/features/user/models/user.model';

export class UserRepository {
  constructor(private readonly userModel: typeof User) {}

  public async createUser(userData: SignupDTO): Promise<IUser> {
    return this.userModel.create(userData);
  }

  public async findUserByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email }).select('+password -_id -__v').lean();
  }

  public findUserById(id: string): Promise<IUser | null> {
    return this.userModel.findById(id).select('-_id -__v').lean();
  }
}
