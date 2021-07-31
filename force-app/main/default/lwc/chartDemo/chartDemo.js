import { LightningElement,wire } from 'lwc';
import getOpportunities from '@salesforce/apex/opportunityController.getOpportunities'
export default class ChartDemo extends LightningElement {
    piechartLabels=[]
    piechartData=[]

    @wire(getOpportunities)
    opportunityHandler({data,error}){
            if(data){
                console.log(data)
                const result = data.reduce((json,val)=>({...json,[val.StageName]:(json[val.StageName]|0)+1}),{})

                if(Object.keys(result).length){
                    this.piechartLabels=Object.keys(result)
                    this.piechartData=Object.values(result)
                }

            }
            if(error){
                console.error(error)    
            }
    }
    
}