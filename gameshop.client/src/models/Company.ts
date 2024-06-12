interface Address {
    state?: string;
    city?: string;
    street?: string;
    zipCode?: string;
}

interface Company {
    id: string;
    name: string;
    createdDate?: Date;
    address?: Address;
    phoneNumber?: string;
    emailAddress: string;
}

export default Company;