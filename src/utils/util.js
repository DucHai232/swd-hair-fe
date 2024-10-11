export const generateNext7Days = () => {
  const daysArray = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i); // Add 'i' days to today's date
    daysArray.push(nextDate.toISOString().split("T")[0]); // Get date in 'YYYY-MM-DD' format
  }

  return daysArray;
};

export const convertToDateString = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
