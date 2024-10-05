export const generateNext7Days = () => {
  const daysArray = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i); // Add 'i' days to today's date
    daysArray.push(nextDate.toISOString().split('T')[0]); // Get date in 'YYYY-MM-DD' format
  }

  return daysArray;
};