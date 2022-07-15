import User from '../models/user.entity';
import { myDataSource } from '../app-data-source';

export const userRepository = myDataSource.getRepository(User).extend({

})
