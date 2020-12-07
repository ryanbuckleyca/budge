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

export const weeksInMonth = (year: number, month: number) => { 
  const daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weeks=[];      
  const lastDate = new Date(year, month + 1, 0); 
  let start:number = 0;
  let end:number; 
  for (let i = 1; i < lastDate.getDate()+1; i++) {         
    if (daysName[Number(new Date(year, month, i).getDay())] =="Monday" || i == lastDate.getDate()) {
      end = i;
      weeks.push({
        start:start+1,
        end:end,
        length:end-start
      }); 
      start = i;           
    }
  }
  return weeks
}
