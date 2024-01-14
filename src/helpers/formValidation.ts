//  Validates form entry for proper email address  //
//  Usage: src/helpers/eventHandlers.ts  //
export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

//  Validates form entry for 10 digit phone number  //
//  Usage: src/helpers/eventHandlers.ts  //
export const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.toString());
};