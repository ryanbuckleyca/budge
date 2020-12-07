import { Obj } from '../interfaces/';
import dayjs from 'dayjs';

export const weekOfYear = (date:Date=new Date) => {
  var dayNr   = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - dayNr + 3);
  var firstThursday = date.valueOf();
  date.setMonth(0, 1);
  if (date.getDay() != 4) {
      date.setMonth(0, 1 + ((4 - date.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - date.valueOf()) / 604800000);
}

// array of weeks in month, starting on Monday
export const weeksInMonth = (year: number, month: number) => { 
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weeks=[];      
  const lastDayOfMonth = new Date(year, month, 0);
  let start:number = 0;
  let end:number; 
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) { 
    const dayOfWeek = new Date(year, month-1, day) 
    const dayName = dayNames[Number(dayOfWeek.getDay())]
    if (dayName =="Sunday" || day == lastDayOfMonth.getDate()) {
      end = day;
      weeks.push({
        start:start+1,
        end:end,
        length:end-start
      }); 
      start = day;           
    }
  }
  return weeks
}

export const weekOfMonth = (date:Date=new Date) => {
  const d = dayjs(date)
  const thisMonth = d.month()+1
  const prevMonth = d.subtract(1,'month').month()+1
  const nextMonth = d.add(1,'month').month()+1
  const prevYear = d.subtract(1, 'year').year()
  const nextYear = d.add(1, 'year').year()
  const theseWeeks:Array<Obj> = weeksInMonth(d.year(), thisMonth)
  const prevWeeks:Array<Obj> = weeksInMonth(prevYear, prevMonth)
  const nextWeeks:Array<Obj> = weeksInMonth(nextYear, nextMonth)
  const day = d.date()
  const thisWeek = theseWeeks.find(
    (week:Obj) => day >= week.start && day <= week.end
  ) || {error: 'could not find week'}
  const weeksIndex = theseWeeks.indexOf(thisWeek);

  if(!thisWeek) return -1;


  if (thisWeek.length < 4 && weeksIndex === 0) {
    return {
      Month: prevMonth, 
      Days: prevWeeks[prevWeeks.length-1],
      WeekOfMonth: weeksIndex+1,
      WeekOfYear: weekOfYear(date)
    }
  }
  else if (thisWeek.length < 4 && weeksIndex === thisWeek.length-1) {
    return {
      Month: nextMonth, 
      Days: nextWeeks[0],
      WeekOfMonth: weeksIndex+1,
      WeekOfYear: weekOfYear(date)
    }
  }
  else {
    return {
      Month: thisMonth, 
      Days: thisWeek,
      WeekOfMonth: weeksIndex+1,
      WeekOfYear: weekOfYear(date)
    }
  }
}
