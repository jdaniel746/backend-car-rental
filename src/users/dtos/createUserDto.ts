interface CreateUser {
    body: {
        email: string;
        firstnames: string;
        lastnames: string;
        phone: string;
        birthdate: string;
        address: string;
        role: string;
    };
}

export default CreateUser;
