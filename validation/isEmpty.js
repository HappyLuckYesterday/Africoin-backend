const isEmpty = (data) => {
  if (
    data === undefined ||
    (typeof data === Object && Object.keys(data).length === 0) ||
    data === "" ||
    data == []
  )
    return true;
  return false;
};

module.exports = isEmpty;
