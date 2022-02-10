const isValidEmail = (email) => {
  const isEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return isEmail.test(email);
};

const isValidMobile = (mobile) => {
  const mobleRegex = /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/;
  return mobleRegex.test(mobile);
};
const isvalidPassword = (password) => {
  const passwordRegex =
    ///^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  isValidEmail,
  isValidMobile,
  isvalidPassword,
};
