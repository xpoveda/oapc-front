
// Coger el json de chrome --> Network --> response
// http://json2ts.com/


export interface Authority {
    authority: string;
}

export interface UsersResponse {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    enabled: boolean;
    lastPasswordResetDate: any;
    authorities: Authority[];
}
