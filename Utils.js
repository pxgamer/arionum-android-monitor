export class Utils {
  static getAccountString (str) {
    return str.substring(0, 20) + '...'
  }

  static formatShortDate (d) {
    if (d != null) {
      return d.toString().substring(0, 24)
    }
    return ''
  }

  static formatAmount (x) {
    return x.toFixed(4)
  }

  static dateFromTs (ts) {
    return new Date(parseInt(ts) * 1000)
  }
}
