/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const validDirections = ['asc', 'desc'];
  const sortedAry = [...arr];

  if (!validDirections.includes(param)) {
    console.log(`Invalid sort param: ${param}`);
    return arr;
  }

  const direction = (param === 'asc') ? 1 : -1;

  sortedAry.sort((a, b) => direction * a.localeCompare(b, ["ru", "en"], {caseFirst: 'upper'}));

  return sortedAry;
}
