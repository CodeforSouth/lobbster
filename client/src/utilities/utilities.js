function isEmptyObject(a) {
  return typeof a === 'object' && (a === null || Object.keys(a).length === 0);
}

function isNonemptyObject(a) {
  return typeof a === 'object' && a !== null && Object.keys(a).length !== 0;
}

module.exports = { isEmptyObject, isNonemptyObject };
