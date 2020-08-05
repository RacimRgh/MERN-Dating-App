const textInputChange = (val) => {
  if (val.length !== 0) {
    setData({
      ...data,
      username: val,
      check_textInputChange: true,
    });
  } else {
    setData({
      ...data,
      username: val,
      check_textInputChange: false,
    });
  }
};

const handlePasswordChange = (val) => {
  setData({
    ...data,
    password: val,
  });
};

const handleConfirmPasswordChange = (val) => {
  setData({
    ...data,
    confirm_password: val,
  });
};

const updateSecureTextEntry = () => {
  setData({
    ...data,
    secureTextEntry: !data.secureTextEntry,
  });
};

const updateConfirmSecureTextEntry = () => {
  setData({
    ...data,
    confirm_secureTextEntry: !data.confirm_secureTextEntry,
  });
};
