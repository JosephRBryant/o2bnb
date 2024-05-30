const formatDateTime = (date) => {
  date = JSON.stringify(date)
  let [year, month, day] = date.split('"')[1].split('T')[0].split('-');
  let [hour, min, sec] = date.split('T')[1].split('.')[0].split(':');
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}
const formatFullDate = (date) => {
  date = JSON.stringify(date)
  let [year, month, day] = date.split('"')[1].split('T')[0].split('-');
  return `${year}-${month}-${day}`
}

const formatDate = (date) => {

  let [year, month, day] = date.split('-');
  return `${year}-${month}-${day}`
}


module.exports = {
  formatDateTime,
  formatFullDate,
  formatDate
}
