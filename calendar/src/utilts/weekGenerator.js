import { startOfWeek, addWeeks, format } from 'date-fns';
import { ru } from 'date-fns/locale';

// Генератор недель в русском формате
function generateWeeks(startDate = new Date(), numberOfWeeks = 52) {
  const weeks = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < numberOfWeeks; i++) {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Неделя начинается с понедельника
    const weekNumber = i + 1;

    weeks.push({
      id: i + 1,
      label: `${weekNumber} неделя\nс ${format(weekStart, 'd MMMM yyyy', { locale: ru })}`,
      startDate: weekStart,
      endDate: addWeeks(weekStart, 1),
      weekNumber: weekNumber
    });

    currentDate = addWeeks(currentDate, 1);
  }

  return weeks;
}

export { generateWeeks };