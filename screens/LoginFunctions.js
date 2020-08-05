export const textInputChange = (val) => {
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

export const handlePasswordChange = (val) => {
  setData({
    ...data,
    password: val,
  });
};

export const handleConfirmPasswordChange = (val) => {
  setData({
    ...data,
    confirm_password: val,
  });
};

export const updateSecureTextEntry = () => {
  setData({
    ...data,
    secureTextEntry: !data.secureTextEntry,
  });
};

export const updateConfirmSecureTextEntry = () => {
  setData({
    ...data,
    confirm_secureTextEntry: !data.confirm_secureTextEntry,
  });
};
