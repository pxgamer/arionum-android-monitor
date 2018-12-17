/* global fetch */
export class ArionumApi {
  constructor (server) {
    this.server = server
  }

  async getBalances (accounts) {
    let results = []
    for (let i = 0; i < accounts.length; i++) {
      let response = await fetch(this.server + '/api.php?q=getBalance&account=' + encodeURIComponent(accounts[i]))
      let r = await response.json()
      results.push({
        accountId: accounts[i],
        value: parseFloat(r.data)
      })
    }
    return results
  }

  async getTransactions (accountId) {
    let response = await fetch(this.server + '/api.php?q=getTransactions&account=' + encodeURIComponent(accountId))
    let r = await response.json()
    return r.data
  }

  async getTransaction (transactionId) {
    let response = await fetch(this.server + '/api.php?q=getTransaction&transaction=' + encodeURIComponent(transactionId))
    let r = await response.json()
    return r.data
  }

  async checkAddress (accountId) {
    let response = await fetch(this.server + '/api.php?q=checkAddress&account=' + encodeURIComponent(accountId))
    let r = await response.json()
    return r.data
  }
}
