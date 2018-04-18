/**
 * 将date:Date拆为year,month,date,day
 * @param {*} dateDetails
 */
export function dateDetails (date) {
  if (typeof date === 'number') {
    date = new Date(date)
  }
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay()
  }
}
/**
 * 以现在的时间为准，获取上月最后一天，当月第一天、当天、最后一天、下月第一天的拆分时间
 * @param {*} dateReference
 */
export function boundaryTime (dateReference) {
  let nowMonthStartDate
  let nowMonthEndDate
  let prevMonthEndDate
  let nextMonthStartDate
  let reference = dateDetails(dateReference)
  const oneDay = 24 * 60 * 60 * 1000
  // 当月起始
  nowMonthStartDate = new Date(`${reference.year}/${reference.month}/${1}`)
  // 下月起始
  if (reference.month === 12) {
    nextMonthStartDate = new Date(`${reference.year + 1}/${1}/${1}`)
  } else {
    nextMonthStartDate = new Date(`${reference.year}/${reference.month + 1}/${1}`)
  }
  // 当月结束
  nowMonthEndDate = new Date(nextMonthStartDate.getTime() - oneDay)
  // 上月结束
  prevMonthEndDate = new Date(nowMonthStartDate.getTime() - oneDay)
  let nowMonthStart = dateDetails(nowMonthStartDate)
  let nowMonthEnd = dateDetails(nowMonthEndDate)
  let prevMonthEnd = dateDetails(prevMonthEndDate)
  let nextMonthStart = dateDetails(nextMonthStartDate)
  return {
    prevMonthEnd,
    nowMonthStart,
    reference,
    nowMonthEnd,
    nextMonthStart
  }
}

/**
 * 填充当月时间6*7矩阵，单个元素为拆分时间
 * @param {boundaryTime} boundaryTime
 */
export function fillDateMatrix ({prevMonthEnd, nowMonthStart, reference, nowMonthEnd, nextMonthStart}) {
  let dateRows = []
  // 按行填充
  let fill = (startRowNum, day, type) => {
    let rowNum = startRowNum + Math.floor(day.day / 7)
    if (!Array.isArray(dateRows[rowNum])) {
      dateRows[rowNum] = []
    }
    dateRows[rowNum][day.day % 7] = {
      year: day.year,
      month: day.month,
      date: day.date++,
      day: day.day++ % 7,
      type: type
    }
  }
  let day = {
    year: nowMonthStart.year,
    month: nowMonthStart.month,
    date: nowMonthStart.date,
    day: nowMonthStart.day
  }
  // 从当月起始日期填充值最后一天
  while (day.date <= nowMonthEnd.date) {
    fill(0, day, 'reference')
  }
  // 填充前一月
  let prevRowNum = 0
  if (dateRows[0][0] !== undefined) {
    dateRows.unshift([])
    prevRowNum += 1
  }
  let prevLength = 7 * prevRowNum + nowMonthStart.day - 1
  let prevStartDate = prevMonthEnd.date - prevLength
  let prevStartDay = prevMonthEnd.day - prevLength
  day = {
    year: prevMonthEnd.year,
    month: prevMonthEnd.month,
    date: prevStartDate,
    day: prevStartDay
  }
  while (day.date <= prevMonthEnd.date) {
    fill(0, day, 'prev')
  }
  // 填充后一个月
  let dateRowsLength = dateRows.length
  let lastRow = dateRows[dateRowsLength - 1]
  let lastIndex = lastRow.length
  let nextRowNum = 6 - dateRowsLength
  let nextLength = 7 * nextRowNum + 7 - lastIndex
  let nextStartRow = dateRowsLength - 1
  if (lastRow.length === 7) {
    nextStartRow += 1
  }
  day = {
    year: nextMonthStart.year,
    month: nextMonthStart.month,
    date: nextMonthStart.date,
    day: nextMonthStart.day
  }
  while (day.date <= nextLength) {
    fill(nextStartRow, day, 'next')
  }
  return dateRows
}
