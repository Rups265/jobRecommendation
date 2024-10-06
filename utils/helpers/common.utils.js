const removeNullUndefined = (obj) => {
  for (let prop in obj) {
    if (obj[prop] === null || obj[prop] === undefined) {
      delete obj[prop];
    }
  }
  return obj;
};

const titleCase = (string) => {
  const temp = string.trim().split(" ");
  const result = temp.map((ele) => {
    return ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase();
  });
  return result.join(" ");
};


module.exports = {
  removeNullUndefined,
  titleCase,
};
