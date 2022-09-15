import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    postsignup(): Promise<void>;
}
