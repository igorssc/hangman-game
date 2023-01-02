export const removeSpecialCharacters = (str: string) => {
  let newValue = str;

  newValue = newValue.replaceAll(/[áàãâä]/gi, "A");
  newValue = newValue.replaceAll(/[éèêë]/gi, "E");
  newValue = newValue.replaceAll(/[íìîï]/gi, "I");
  newValue = newValue.replaceAll(/[óòõôö]/gi, "O");
  newValue = newValue.replaceAll(/[úùûü]/gi, "U");
  newValue = newValue.replaceAll(/[ç]/gi, "C");

  return newValue;
};
