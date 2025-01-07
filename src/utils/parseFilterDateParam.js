const parseDate = (date, defaultValue = new Date()) => {
  if (date) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return defaultValue;
    }
    return parsedDate;
  }
  return defaultValue;
};

export const parseCurrentDayParam = (query) => {
  const { date } = query;
  const parsedDate = parseDate(date);

  const minDate = new Date(parsedDate);
  minDate.setHours(0, 0, 0, 0);

  const maxDate = new Date(parsedDate);
  maxDate.setHours(23, 59, 59, 999);

  return { minDate, maxDate };
};

export const parseCurrentMonthParam = (query) => {
  const { date } = query;
  const parsedDate = parseDate(date);
  const minDate = new Date(parsedDate);
  minDate.setDate(1);
  minDate.setHours(0, 0, 0, 0);

  const maxDate = new Date(parsedDate);
  maxDate.setMonth(parsedDate.getMonth() + 1);
  maxDate.setDate(0);
  maxDate.setHours(23, 59, 59, 999);

  return { minDate, maxDate };
};
