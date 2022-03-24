const emailValidate = (email) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
};

const passwordValidate = (password) =>
    password.length >= 5 && password.length <= 50;



const max50CharsValidate = (input) => input.length <= 50;

const max255CharsValidate = (input) => input.length <= 255;

const max100CharsValidate = (input) => input.length <= 100;

const required = (input) => input.length !== 0;

const Validator = {
    emailValidate,
    passwordValidate,
    max50CharsValidate,
    max255CharsValidate,
    max100CharsValidate,
    required,
};
export default Validator;