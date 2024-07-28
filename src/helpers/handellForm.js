const handelEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return true;
  } else {
    return false;
  }
};
const handelPassword = (password) => {
  if (password.length >= 7) {
    return true;
  } else {
    return false;
  }
};
const handelName = (name) => {
  if (name.length >= 3) {
    return true;
  } else {
    return false;
  }
};
export { handelEmail, handelPassword, handelName };
