function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000
  const milliSecondsPerHour = milliSecondsPerMinute * 60
  const milliSecondsPerDay = milliSecondsPerHour * 24
  const milliSecondsPerMonth = milliSecondsPerDay * 30
  const milliSecondsPerYear = milliSecondsPerMonth * 365
  const elapsed = current - previous
  let timeToShow = 'unknown'

  switch (true) {
    case elapsed < milliSecondsPerMinute / 3:
      timeToShow = 'just now'
      break
    case elapsed < milliSecondsPerMinute:
      timeToShow = 'less than 1 min ago'
      break
    case elapsed < milliSecondsPerHour:
      timeToShow = Math.round(elapsed / milliSecondsPerMinute) + ' min ago'
      break
    case elapsed < milliSecondsPerDay:
      timeToShow = Math.round(elapsed / milliSecondsPerHour) + ' h ago'
      break
    case elapsed < milliSecondsPerMonth:
      timeToShow = Math.round(elapsed / milliSecondsPerDay) + ' days ago'
      break
    case elapsed < milliSecondsPerYear:
      timeToShow = Math.round(elapsed / milliSecondsPerMonth) + ' mo ago'
      break
    default:
      timeToShow = Math.round(elapsed / milliSecondsPerYear) + ' years ago'
  }
  return timeToShow
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()
  return timeDifference(now, updated)
}
