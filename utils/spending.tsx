import dayjs from 'dayjs';
import { Obj } from '../interfaces/';
import { weekOfYear } from './dates'


// TODO: refactor to make use of common functionality

export const SpentThisMonth = (catID:object, logs:Array<Object>) => {
  const catLogs:Array<Obj> = logs.filter(
    (log:Obj) => log.fields.Category[0] === catID
  )
  const monthly:Array<Obj> = catLogs.filter(
    (log:Obj) => dayjs(log.fields.Time).month() === dayjs().month()
  )

  if(!monthly[0]) return 0

  if (monthly.length > 1) {
    const total:Obj = monthly.reduce((a:Obj, b:Obj) => (
      {sum: a.fields.Amount + b.fields.Amount}
    ))
    return total.sum
  }

  return monthly[0].fields.Amount
}

export const SpentThisWeek = (catID:object, logs:Array<Object>) => {
  const catLogs:Array<Obj> = logs.filter(
    (log:Obj) => log.fields.Category[0] === catID
  )
  const weekly:Array<Obj> = catLogs.filter(
    (log:Obj) => weekOfYear(new Date(log.fields.Time)) === weekOfYear(new Date())
  )

  if(!weekly[0]) return 0

  if (weekly.length > 1) {
    const total:Obj = weekly.reduce((a:Obj, b:Obj) => (
      {sum: a.fields.Amount + b.fields.Amount}
    ))
    return total.sum
  }

  return weekly[0].fields.Amount
}