export function removeAllTagsFromString(str) {
  let copyString = '';
  if (str === null || str === '') return false;
  else copyString = str.toString();
  return copyString
    .replace(/<[^>]*>?/gm, '')
    .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '');
}
