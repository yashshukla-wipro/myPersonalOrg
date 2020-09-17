import { LightningElement,api,wire,track } from 'lwc';
import fetchDog from '@salesforce/apex/DogAPIController.dogImageMethod';
import { NavigationMixin } from 'lightning/navigation';

export default class IntegrationBasic extends LightningElement {
    boolShowImage = false;
    boolShowSpinner = false;
    strUrl;
 
    handleClick(){
        var tmp1=['2','3','4'];
        var tmp2 = [...tmp1];
        tmp2.push('5');
        console.log('temp1 '+JSON.stringify(tmp1));
        console.log('temp2 '+JSON.stringify(tmp2));
        this.boolShowSpinner = true;
        this.boolShowImage = false;
        fetchDog({}).then(response => {
            this.strUrl = response;
            this.boolShowImage = true;
            this.boolShowSpinner = false;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }
    @track markers=[];
    handleClickLocation()
    {
        if(navigator.geolocation)
        {
            console.log('test '+navigator.geolocation.getCurrentPosition);
            navigator.geolocation.getCurrentPosition(position=>{
                console.log('lattitude '+position.coords.latitude);
                this.markers = [{
                    location: { 
                        Latitude : position.coords.latitude,
                        Longitude : position.coords.longitude,
                        City : 'Delhi',
                        Country : 'India'
                    },
                    title : 'Yash is here'
                }]
                this.markers.push({
                    location:{
                        City:'Sainte-Maxime',
                        Country:'France'
                    },
                    title : 'France CIty'
                })
            });
        }
    }
}