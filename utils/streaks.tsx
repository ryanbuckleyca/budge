import dayjs from 'dayjs';
import { Obj } from '../interfaces';

export const streaks = (logs:Array<Obj>) => {
  if (!logs || logs.length < 1)
    return ({ current: '?', record: '?' })

  const current = dayjs().diff(logs[0].fields.Time, 'd')
  
  let record = 0;
  let streak = current;
  
  for(let i=0; i<logs.length; i++) {
    streak = dayjs(logs[i].fields.Time)
             .diff(logs[i+1].fields.Time, 'd')
    if(streak > record) 
      record = Math.abs(streak)

    if (i===logs.length-2) 
      break
  }
  return ({ current, record })
}