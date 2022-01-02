export const PREFIX_ID = '_';

export function getPrefixID(id: any): string {
  return `${PREFIX_ID}${id}`;
}
