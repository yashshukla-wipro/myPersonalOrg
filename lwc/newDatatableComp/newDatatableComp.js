import { LightningElement, track, wire } from 'lwc';
import retList from '@salesforce/apex/NewLWCClass.returnAccountList';

export default class NewDatatableComp extends LightningElement {
 @track columns=[
 {
    label:'Name',fieldName:'Name',type:'text'
}

];
 @track dataList=[];
 @track preselectedRows=[];
 @track trackInt=0;
 @wire(retList) wireData({error,data}){
      
        if(data){
           //console.log("Watch: varName ->"+JSON.stringify(data));
           
          
           this.dataList=data;
           
        }
        if(error){
            console.log("Returned Error-> "+JSON.stringify(error));
        }
    };

    getSelectedName(evt)
    {

        const selRows=evt.detail.selectedRows;
        for(var x=0;x<selRows.length;x++)
        {
            alert(selRows[x].Id);
        }
        if(selRows.length>5)
        {
            selRows.splice(selRows.length-1,1);
            return;
            
        }
           
        console.log('test '+JSON.stringify(this.template.querySelector('lightning-datatable').getSelectedRows()));
    }

    handleSelect()
    {
        var data=this.dataList;
        const row=['a'];
        
        this.preselectedRows=row;
    }


}