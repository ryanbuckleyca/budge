import dayjs from 'dayjs';
import { Obj } from '../interfaces/';
import { weekOfYear, weeksInMonth } from './dates'


// TODO: refactor to make use of common functionality

const filterLogsByCat = (logs:Array<Obj>, catID:string='') => (
  catID==='' ? logs : logs.filter(
    (log:Obj) => log.fields.Category[0] === catID
  )
)

export const TotalBudget = (cats:Array<Obj>) => {
  console.log('total budget called with: ', cats)
  const total = cats.reduce(
    (a:Obj, b:Obj) => ({sum: a.fields.BudgetMonthly + b.fields.BudgetMonthly})
  )
  return total.sum
}

export const SpentThisMonth = (logs:Array<Obj>, catID:string='') => {
  const catLogs = filterLogsByCat(logs, catID)
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

export const SpentThisWeek = (logs:Array<Obj>, catID:string='') => {
  const catLogs = filterLogsByCat(logs, catID)
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

export const CategorySpending = (cat:Obj, logs:Array<Obj>) => {
  const { id, fields } = cat
  const { BudgetMonthly, Frequency } = fields;

  const d = new Date()
  const frequency = Frequency === 'Monthly' ? "M" : "W"
  const weeksThisMonth = weeksInMonth(d.getFullYear(), d.getMonth()+1)
    .filter(wk => wk.length > 3)
  const thisWeek = SpentThisWeek(logs, id)
  const thisMonth = SpentThisMonth(logs, id)
  const spentFractionMonth = thisMonth+'/'+BudgetMonthly
  const spentFractionWeek = `${thisWeek}/${BudgetMonthly / weeksThisMonth.length}`
  const limit = (frequency === 'M') 
    ? eval(spentFractionMonth)
    : eval(spentFractionWeek)
  const fraction = frequency === 'M' 
    ? spentFractionMonth
    : spentFractionWeek
  return ({ 
    frequency, 
    limit, 
    fraction, 
    thisWeek, 
    thisMonth
  })
}
