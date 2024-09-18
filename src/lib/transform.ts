export function nameToAsciiUsername(name: string, replacementChar = '') {
  const asciiName = name.replace(/[^\x00-\x7F]/g, '');
  const username = asciiName.replace(/\s+/g, replacementChar);
  return username.toLowerCase();
}
