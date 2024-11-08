export const setTokenWithExpiry = (key, token, expiryDays = 1) => {
  const expiryTime = Date.now() + expiryDays * 24 * 60 * 60 * 1000;
  localStorage.setItem(key, JSON.stringify({ token, expiryTime }));
};

export const getTokenWithExpiry = (key) => {
  const tokenData = JSON.parse(localStorage.getItem(key));
  if (!tokenData || Date.now() > tokenData.expiryTime) {
    localStorage.removeItem(key);
    return null;
  }
  return tokenData.token;
};
