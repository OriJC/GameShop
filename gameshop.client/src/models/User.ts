interface User {
    userName: string;
    email: string;
    password: string;
    roles: string[];
}

interface LoginModel {
    userName: string;
    password: string;
}

export type { User, LoginModel }