export default {
  format: function (interval) {
    interval = interval | 0
    let minute = interval / 60 | 0
    if (minute < 60) {
      minute = '0' + minute
    }
    const second = this._pad(interval % 60)
    return `${minute}:${second}`
  },
  _pad: function (num, n = 2) {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  }
}
