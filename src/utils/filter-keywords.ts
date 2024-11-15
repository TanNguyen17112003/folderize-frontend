export const filterKeywors = (keywords: string, test: string): boolean => {
  const keywordsArray = keywords.split(' ');
  if (keywordsArray.length === 1) {
    return test.includes(keywords);
  }
  let operator = '';
  for (let i = keywordsArray.length - 1; i >= 0; i--) {
    if (keywordsArray[i] === '&&' || keywordsArray[i] === '||') {
      operator = keywordsArray[i];
    } else {
      if (operator === '&&' || (operator === '' && keywordsArray[i - 1] === '&&')) {
        if (!test.includes(keywordsArray[i])) {
          return false;
        }
        operator = '';
      } else if (operator === '||' || (operator === '' && keywordsArray[i - 1] === '||')) {
        if (test.includes(keywordsArray[i])) {
          return true;
        }
        operator = '';
      }
    }
  }
  return false;
};
