import dayjs from 'dayjs';
import { Obj } from '../interfaces/';
import { weekOfYear, weeksInMonth } from './dates'

const filterLogsByCat = (logs:Array<Obj>, catID:string='') => (
  catID==='' ? logs : logs.filter(
    (log:Obj) => log.fields.Category[0] === catID
  )
)

export const TotalBudget = (cats:Array<Obj>, timeFrame:string='Monthly') => {
  const budget = cats.filter((cat) => cat.fields.Frequency === timeFrame)
  const total = budget.reduce((a:Obj, b:Obj) => ({
      fields: { BudgetMonthly: a.fields.BudgetMonthly + b.fields.BudgetMonthly }
    })
  )
  return total.fields.BudgetMonthly
}

export const SpentThisPeriod = (timeFrame:string, logs:Array<Obj>, catID:string='') => {
  const filter = (date:string, timeFrame:string) => {
    const filters : { [string: string]: boolean } = {
      month: dayjs(date).month() === dayjs().month(),
      week: weekOfYear(new Date(date)) === weekOfYear(new Date())
    }
    return filters[timeFrame]
  }

  const catLogs = filterLogsByCat(logs, catID)
  const period:Array<Obj> = catLogs.filter(
    (log:Obj) => filter(log.fields.Time, timeFrame)
  )

  if(!period[0]) return 0

  if (period.length > 1) {
    const total:Obj = period.reduce((a:Obj, b:Obj) => (
      { fields: { Amount: a.fields.Amount + b.fields.Amount } }
    ))
    return total.fields.Amount
  }

  return period[0].fields.Amount
}


export const CategorySpending = (cat:Obj, logs:Array<Obj>) => {
  const { id, fields } = cat
  const { BudgetMonthly, Frequency } = fields;

  const d = new Date()
  const frequency = Frequency === 'Monthly' ? "M" : "W"
  const weeksThisMonth = weeksInMonth(d.getFullYear(), d.getMonth()+1)
    .filter(wk => wk.length > 3)
  const thisWeek = SpentThisPeriod('week', logs, id)
  const thisMonth = SpentThisPeriod('month', logs, id)
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
