import { LightningElement,api } from 'lwc';
import chartJs from '@salesforce/resourceUrl/chartJs'
import {loadScript} from 'lightning/platformResourceLoader'
export default class Charts extends LightningElement {
    isChartJsInitialized
    chart
    @api type
    @api chartData
    @api chartHeading
    @api chartLabels

    //type=this.type
                  
    renderedCallback(){
        if(this.isChartJsInitialized){
            return;
        }
        loadScript(this,chartJs+'/chartJs/Chart.js').then(()=>{
            console.log("charts loaded successfully")
            this.isChartJsInitialized = true
            this.loadCharts()
        }).catch(error=>{
            console.error(error)
        })
    }

    loadCharts(){

        // issue with chart JS - it tries to inject css into the dom
        window.Chart.platform.disableCSSInjection = true
        const canvas= document.createElement('canvas')
        this.template.querySelector('div.chart').appendChild(canvas) //appending canvas to the html file
        const context = canvas.getContext('2d')
        this.chart=new window.Chart(context,this.config())
    }
    config(){
        return {
            type: this.type,
            data: {
                labels: this.chartLabels ? this.chartLabels:[],
                datasets: [{
                    label: this.chartHeading,
                    data: this.chartData ? this.chartData:[], //data need to come in 
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(30, 204, 148, 0.8)',
                        'rgba(33, 205, 148, 0.3)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive:true,
                legend:{
                    position:'right'
                },
                animation:{
                    animateScale:true,
                    animateRotate:true
                }

            }
        }

    }


}

