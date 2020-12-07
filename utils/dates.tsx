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
// TODO: change this to receive a date object argument
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

export const weekInfo = (date:Date=new Date) => {
  const d = dayjs(date)
  const thisMonth = d.month()+1
  const prevWeeksMonth = d.subtract(1,'month').month()+1
  const nextWeeksMonth = d.add(1,'month').month()+1
  const prevWeeksYear = d.subtract(1,'month').year()
  const nextWeeksYear = d.add(1, 'month').year()
  const theseWeeks:Array<Obj> = weeksInMonth(d.year(), thisMonth)
  const prevWeeks:Array<Obj> = weeksInMonth(prevWeeksYear, prevWeeksMonth)
  const nextWeeks:Array<Obj> = weeksInMonth(nextWeeksYear, nextWeeksMonth)
  const day = d.date()
  const thisWeek = theseWeeks.find(
    (week:Obj) => day >= week.start && day <= week.end
  ) || {error: 'could not find week'}
  const weeksIndex = theseWeeks.indexOf(thisWeek);

  if (!thisWeek) return -1;

  const dateInfo = {
    WeekOfMonth: weeksIndex+1,
    WeekOfYear: weekOfYear(date),
    WeekID: -1,
    Year: -1,
    Month: -1,
    Days: {}
  }

  if (thisWeek.length < 4 && weeksIndex === 0) {
    dateInfo.WeekID = prevWeeksYear*100+dateInfo.WeekOfYear
    dateInfo.Year = prevWeeksYear
    dateInfo.Month = prevWeeksMonth
    dateInfo.Days = prevWeeks[prevWeeks.length-1]
  }
  else if (thisWeek.length < 4 && weeksIndex === thisWeek.length-1) {
    dateInfo.WeekID = nextWeeksYear*100+dateInfo.WeekOfYear
    dateInfo.Year = nextWeeksYear
    dateInfo.Month = nextWeeksMonth
    dateInfo.Days = nextWeeks[0]
  }
  else {
    dateInfo.WeekID = d.year()*100+dateInfo.WeekOfYear
    dateInfo.Year = d.year()
    dateInfo.Month = thisMonth
    dateInfo.Days = thisWeek
  }

  return dateInfo;
}
