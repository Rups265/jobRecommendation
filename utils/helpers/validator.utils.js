require("dotenv").config();
const CryptoJS = require("crypto-js");

function headerEncode(message) {
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(
    message,
    process.env.API_KEY
  ).toString();
  console.log(ciphertext);
  return ciphertext;
}

function headerDecode(message) {
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(message, process.env.API_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  console.log(originalText);
  return originalText;  
}

function validateEmail(email) {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailPattern.test(email)) {
    return true;
  } else {
    return false;
  }
}

function validateMobileNumber(number) {
  const cleanNumber = number.toString().replace(/\D/g, '');
  return cleanNumber.length === 10 && /^[689]\d{9}$/.test(cleanNumber);
}


const titleCase = (string) => {
  if (typeof string !== 'string') {
    return '';
  }
  
  const words = string.split(' ');
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join(' ');
};

module.exports = {
  validateMobileNumber,
  validateEmail,
  headerDecode,
  headerEncode,
  titleCase
};
