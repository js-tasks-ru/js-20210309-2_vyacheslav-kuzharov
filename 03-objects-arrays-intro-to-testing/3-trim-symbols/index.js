/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {return '';}
  if (size === undefined) {return string;}

  let targetString = '';
  let accum = '';
  let prev = '';

  for (let current of string) {
    if (current === prev) {
      if (accum.length < size) {accum += current;}
    } else {
      targetString += accum;
      accum = current;
    }
    prev = current;
  }

  targetString += accum;

  return targetString;
}
