function isValidText(value, minLength = 3) {
  return value && value.trim().length >= minLength;
}

function isValidPrenume(value, maxLength = 10) {
  return value && value.trim().length <= maxLength;
}

function isValidDate(value) {
  const date = new Date(value);
  if (value && date !== "Invalid Date") {
    const start = new Date("1900-01-01");
    const end = new Date();
    return date > start && date < end;
  } else {
    return false;
  }
}

function isValidEmail(value) {
  return value && value.includes("@");
}

function isPassword(value) {
  return (
    value &&
    /^(?=(.*[A-Za-z]){2})(?=(.*\d){2})(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/.test(
      value
    )
  );
}

exports.isValidText = isValidText;
exports.isValidPrenume = isValidPrenume;
exports.isValidDate = isValidDate;
exports.isPassword = isPassword;
exports.isValidEmail = isValidEmail;
