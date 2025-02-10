export function removeAllTagsFromString(str) {
  let copyString = '';
  if (str === null || str === '') return '';
  else copyString = str.toString();
  return copyString
    .replace(/<[^>]*>?/gm, '')
    .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '');
}
