import { startOfWeek, endOfWeek, addWeeks, format } from 'date-fns';

function generateWeeks(startDate = new Date(), numberOfWeeks = 52) {
  const weeks = [];
  let currentDate = startDate;

  for (let i = 0; i < numberOfWeeks; i++) {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Неделя начинается с понедельника
    const weekEnd = endOfWeek(weekStart);

    weeks.push({
      id: i + 1,
      label: `${i + 1} неделя с ${format(weekStart, 'dd.MM.yyyy')} по ${format(weekEnd, 'dd.MM.yyyy')}`,
      startDate: weekStart,
      endDate: weekEnd,
    });

    currentDate = addWeeks(currentDate, 1);
  }

  return weeks;
}

export { generateWeeks };