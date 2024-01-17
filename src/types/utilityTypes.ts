export type TCredentials = {
    email: string;
    password: string;
};

export type TClientValidation = {
    name: boolean,
    phone: boolean,
    email: boolean,
    address: boolean,
    city: boolean,
    state: boolean,
    zip: boolean
}