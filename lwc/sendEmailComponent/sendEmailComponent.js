import { LightningElement,track,api } from 'lwc';
import saveTheJSONinAccount from "@salesforce/apex/LWCPDFClass.saveTheJSONinAccount";

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SendEmailComponent extends LightningElement {
    
    @track partDetails=[];
    @api testVal='';
   
    connectedCallback()
    {
        console.log('test '+this.testVal);
    }
    getIndex(str){
        const parts = str.split('-');
        parts.pop();
        return parts.join('-');
    }
    addNewProdInf()
    {
       var partData = this.partDetails;
       var index=0;
       if(partData.length==0||partData==undefined)
       {
           index=1;
       }
       else
       {
           for(var x=0;x<partData.length;x++)
           {
               if(partData[x]['Id']>index)
               {
                 index=parseInt(partData[x]['Id']);
               }

           }
           index=(index+1).toString();
       }
       
       partData.push({
           'Id':index,
           'checkBoxVal':false,
           'ProdName':'',
           'ProdQuant':'',
           'ProdDesc':''
       });
       this.partDetails=partData;
       this.selectAllCheckBox=false;
       console.log('par '+JSON.stringify(this.partDetails));


    }
    handleProductChange(evt)
    {
        //alert('test');
        console.log('evt '+evt.target.id);
        var handledata=this.partDetails;
        for(var d in handledata)
        {
            if(handledata[d]['Id']==this.getIndex(evt.target.id))
            {
                handledata[d]['ProdName']=evt.target.value;
                break;          
            }
            
        }
        this.partDetails=handledata;
        console.log('data new '+JSON.stringify(this.partDetails));
    }

    handleQuantityChange(evt)
    {
        console.log('evt '+evt.target.id);
        var handledata=this.partDetails;
        for(var d in handledata)
        {
            if(handledata[d]['Id']==this.getIndex(evt.target.id))
            {
                handledata[d]['ProdQuant']=evt.target.value;
                break;            
            }
            
        }
        this.partDetails=handledata;
        console.log('data new '+JSON.stringify(this.partDetails));

    }
    handleDescriptionChange(evt)
    {
        console.log('evt '+evt.target.id);
        var handledata=this.partDetails;
        for(var d in handledata)
        {
            if(handledata[d]['Id']==this.getIndex(evt.target.id))
            {
                handledata[d]['ProdDesc']=evt.target.value;
                break;               
            }
            
        }
        this.partDetails=handledata;
        console.log('data new '+JSON.stringify(this.partDetails));

    }
    handleSelectAllCheckbox(evt)
    {
        console.log('checked '+evt.target.checked);
        this.selectAllCheckBox=evt.target.checked;
        for(var d in this.partDetails)
        {
            this.partDetails[d]['checkBoxVal']=evt.target.checked;
        }
    }
    handleCheckboxChange(evt)
    {
        for(var d in this.partDetails)
        {
            if(this.partDetails[d]['Id']==this.getIndex(evt.target.id))
            {
                this.partDetails[d]['checkBoxVal']=evt.target.checked;
                break;
            }
        }    
        this.checkIfAllCheckBoxesSelected();
    }
    checkIfAllCheckBoxesSelected()
    {
        var tempValue=false;
        for(var d in this.partDetails)
        {
            if(this.partDetails[d]['checkBoxVal'])
            {
                tempValue=true;
            }
            else{
                tempValue=false;
                break;
            }
        }
        this.selectAllCheckBox=tempValue;
    }
    removeSelectedRows()
    {
        var newPartDets=[];
        for(var d in this.partDetails)
        {
            if(!this.partDetails[d]['checkBoxVal'])
            {
                newPartDets.push(this.partDetails[d]);
            }
        }

        this.partDetails=newPartDets;
        this.selectAllCheckBox=false;
    }

    generatePDF()
    {
        console.log('in pdf ');
        var seldata=[];
        if(this.partDetails.length==0)
        {
            this.showToast('Error!','error','Please add a row to proceed');
            this.showSpinner=false;
            return;

        }
        for(var d in this.partDetails)
        {
            if((this.partDetails[d]['ProdName']!='' && this.partDetails[d]['ProdQuant']!='' && this.partDetails[d]['ProdDesc']!=''))
            {
                seldata.push(this.partDetails[d]);
            }
        }
        console.log('sel data '+JSON.stringify(seldata));

        if(seldata.length==0)
        {
            this.showToast('Error!','error','Please map the data in any of the row completely to proceed');
            this.showSpinner=false;
            return;
        }
        var selDataWithCheckboxTrue=[];
        for(var d in seldata)
        {
            if(seldata[d]['checkBoxVal'])
            {
                selDataWithCheckboxTrue.push(seldata[d]);
            }
        }
        console.log('selDataWithCheckboxTrue data =>'+JSON.stringify(selDataWithCheckboxTrue));
        if(selDataWithCheckboxTrue.length>0)
        {
            seldata = selDataWithCheckboxTrue;
        }
        console.log('final data =>'+JSON.stringify(seldata));
        saveTheJSONinAccount({
           
            jsonfield:JSON.stringify(seldata)
        })
            .then(res =>{
                console.log('Success '+res);
                alert('Success');
                window.open("/apex/NewVfPage","_blank");
                
               
              
                
            })
            .catch(err =>{
                console.log('value'+JSON.stringify(err));
                this.showToast('Error!','error',err);
                this.showSpinner=false;
            })   
       
    }

    showToast(title,variant,message){
        const event = new ShowToastEvent({
            "title": title,
            "variant": variant,
            "message": message,
            "mode": 'dismissable'
        });
        this.dispatchEvent(event);
    }

    



}