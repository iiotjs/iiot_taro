import dayjs from 'dayjs'

export const formatTime = (Timestamp) => {
  if (!Timestamp || Timestamp === '' || Timestamp === 0 || Timestamp === '0') {
    return {
      format: () => {
        return '-'
      }
    }
  }
  return dayjs(Timestamp * 1000)
}

export const FormatTime = (date, separator = '-') => {
  const y = date.getFullYear().toString()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()

  return String.prototype.concat(y, separator, m, separator, d, ' ', h, ':', mm, ':', ss)
}