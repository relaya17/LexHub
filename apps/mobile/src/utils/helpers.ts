export const formatIsoDate = (isoDate: string): string => {
  const date: Date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return date.toLocaleDateString('he-IL');
};


