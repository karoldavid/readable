export function convertTimestamp(timestamp) {
  let newDate = new Date()
  newDate.setTime(timestamp)
  const dateString = newDate.toUTCString()
  return dateString
}