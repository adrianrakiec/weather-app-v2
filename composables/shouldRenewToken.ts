export const shouldRenewToken = (expiredAt: number) => {
  const now = Math.floor(Date.now() / 1000);

  return expiredAt - now < 1000;
};
