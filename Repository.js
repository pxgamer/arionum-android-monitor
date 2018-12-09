import { AsyncStorage } from 'react-native';


export class Repository
{    
    constructor()
    {

    }

    async getAccountList()    
    {
        let accountListJson = await AsyncStorage.getItem("ArionumAccountList");
        if (accountListJson != null)
            return JSON.parse(accountListJson);
        return [];
    }

    async addAccount(val)
    {        
        val = val.trim();
        if (val.length > 0)
        {
            let accountList = await this.getAccountList();    
            if (accountList.indexOf(val)==-1)
            {
                accountList.push(val);
                return this.saveAccountList(accountList);        
            }
        }
        return false;        
    }

    async deleteAccount(val)
    {
        val = val.trim();
        if (val.length > 0)
        {
            let accountList = await this.getAccountList();    
            let idx = accountList.indexOf(val);
            if (idx >= 0)
            {
                accountList.splice(idx, 1);                
                return this.saveAccountList(accountList);        
            }
        }
        return false;  
    }

    


    async saveAccountList(accountList)
    {       
        await AsyncStorage.setItem("ArionumAccountList", JSON.stringify(accountList));
        return true;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    async getServers()
    {
        return [
            "http://peer1.arionum.com",
            "http://peer2.arionum.com",
            "http://peer3.arionum.com",
            "http://peer4.arionum.com",
            "http://peer5.arionum.com",
            "http://peer6.arionum.com",
            "http://peer7.arionum.com",         
            "http://peer8.arionum.com"        
        ];
    }

    async getRandomServer()
    {
        let servers = await this.getServers();
        let idx = Math.floor(Math.random() * Math.floor(servers.length));
        return servers[idx];
    }
}