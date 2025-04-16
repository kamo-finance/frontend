export function truncateSuiObjectId(
  objectId: string | null | undefined,
  startChars: number = 4,
  endChars: number = 4,
): string {
  if (!objectId) {
    return "";
  }

  const prefix = "0x";

  if (!objectId.startsWith(prefix)) {
    return objectId;
  }

  const body = objectId.substring(prefix.length);
  const totalBodyLength = body.length;
  const ellipsis = "...";

  if (totalBodyLength <= startChars + endChars) {
    return objectId;
  }

  const startPart = body.substring(0, startChars);
  const endPart = body.substring(totalBodyLength - endChars);

  return `${prefix}${startPart}${ellipsis}${endPart}`;
}
