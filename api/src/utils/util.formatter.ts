export const fmtArrayErrMessage = (err: any[]): string => {
  if (!Array.isArray(err)) {
    return "";
  }

  return err
    .filter((e) => e?.message != null)
    .map((e) => String(e.message))
    .join(", ");
}


export const genInternalUniqueId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let uniqueId = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    uniqueId += chars[randomIndex];
  }
  return uniqueId;
}
