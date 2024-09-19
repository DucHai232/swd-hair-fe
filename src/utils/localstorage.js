export const setTokenWithExpiry = (key, token, expiryDays) => {
  const now = new Date();
  const expiryTime = now.getTime() + expiryDays * 24 * 60 * 60 * 1000;
  const tokenData = { token, expiryTime };
  localStorage.setItem(key, JSON.stringify(tokenData));
};

export const getTokenWithExpiry = (key) => {
  const tokenData = JSON.parse(localStorage.getItem(key));
  if (!tokenData) return null;

  const now = new Date();
  if (now.getTime() > tokenData.expiryTime) {
    localStorage.removeItem(key);
    return null;
  }

  return tokenData.token;
};
