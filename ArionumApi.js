export class ArionumApi
{
    constructor(server) {
        this.server = server;
    }    

    async getBalances(accounts)
    {
        let results = [];        
        for(let i=0; i<accounts.length; i++)    
        {
                let response = await fetch(this.server +'/api.php?q=getBalance&account='+accounts[i]);
                let r = await response.json();
                results.push({
                    accountId : accounts[i],
                    value : parseFloat(r.data)
                });
        }
        return results;
    }   
    
    async getTransactions(accountId)
    {        
        let response = await fetch(this.server +'/api.php?q=getTransactions&account='+accountId);
        let r = await response.json();
        return r.data;
    }

    async getTransaction(transactionId)
    {        
        let response = await fetch(this.server +'/api.php?q=getTransaction&transaction='+transactionId);
        let r = await response.json();
        return r.data;
    }

}


