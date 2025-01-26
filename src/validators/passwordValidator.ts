const passwordValidator = (password: string) => {
    const legnthValidator = password.length >= 8;
    const upperCaseValidator = /[A-Z]/.test(password);
    const lowerCaseValidator = /[a-z]/.test(password);
    const numberValidator = /\d/.test(password);
    const specialCharValidator = /[^a-zA-Z0-9]/.test(password);

    return {
        legnthValidator,
        upperCaseValidator,
        lowerCaseValidator,
        numberValidator,
        specialCharValidator,
    };
};

export default passwordValidator;
