import { User } from './user';

/**
 * UI Model for delete user request
 */
export class DeleteUserRequest{
    sessionId: string;
	updatedBy: string;
    userModel: User;
    
    constructor(sessionId:string, updatedBy:string, userModel: User){
        this.sessionId = sessionId;
        this.updatedBy = updatedBy;
        this.userModel = userModel;
    }
}