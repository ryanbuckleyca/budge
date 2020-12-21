export const loadDataFrAPI = async () => {
  try {
    const logs = await getLogRecords()
    setLogs(logs.records)
    saveOfflineData("logs", JSON.stringify(logs.records))
    const cats = await getCatRecords()
    setCats(cats.records)
    saveOfflineData("cats", JSON.stringify(cats.records))
  } catch (err) {
    console.log(`error loading from API: `, err)
  }
}
export const loadDataFrCache = async () => {
  try {
    const logs = await loadOfflineData("logs")
    setLogs(JSON.parse(logs))
    const cats = await loadOfflineData("cats")
    setCats(JSON.parse(cats))
  } catch (err) {
    console.log(`error loading from local storage: `, err)
  }
}