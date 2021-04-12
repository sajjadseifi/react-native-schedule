export const updateObject = (orginalObj, targetObj) => {
  return {
    ...orginalObj,
    ...targetObj
  };
};
