interface CreateItem {
    body: {
        client: string;
        phone: string;
        plate: string;
        from: string;
        to: string;
        status: string;
        user: string;
    };
}

export default CreateItem;
