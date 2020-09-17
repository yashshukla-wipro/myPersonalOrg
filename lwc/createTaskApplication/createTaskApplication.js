import { LightningElement, track, wire} from 'lwc';
import jsonTestMethod from '@salesforce/apex/NewLWCClass.jsonTestMethod';
import handleEMailMethod from '@salesforce/apex/NewLWCClass.handleEmailFetch';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateTaskApplication extends LightningElement {
    time='';
    greeting='';
    @track testJSON={'firstname':'Yash','secondname':'','emailId':'','contactno':''};
    @track data=[];
    @track newJSON={'Id':'1','name':'','phone':'','email':'','checked':false};
    @track selectedRowsId=[];

    constructor()
    {
        super();
        this.addEventListener('myeventfromcomponentlwc',this.handleeventfromcomplwcinextremeparent.bind(this));
    }

    handleeventfromcomplwcinextremeparent(evt)
    {
        alert('from parent '+evt.detail);
    }

    renderedCallback()
    {
      
        var date=new Date();
        var hour=date.getHours();
        var min=date.getMinutes();
        var ampm=(hour<12?'AM':'PM');
        
        this.time=`${hour}:${min}:${ampm}`;
        this.greeting=this.getGreeting(hour);
        

        
    }

    connectedCallback()
    {
        console.log('yash in connected')
        this.data.push(this.newJSON);
        console.log('test resp '+JSON.stringify(this.data));
    }

    
    getGreeting(hour)
    {
        if(hour<12)
         return 'GOOD MORNING';
        else if(hour>=12 && hour<=16)
         return 'GOOD AFTERNOON';
        else
         return 'GOOD NIGHT';
    }

    trimId(iddata)
    {
        iddata=iddata.split('-');
        return iddata[0];
    }

    changeHandler(evt)
    {
        var test=this.testJSON;
        test[this.trimId(evt.target.id)]=evt.target.value;
        //this.data.push(this.data[this.trimId(evt.target.id)]=evt.target.value);
        this.testJSON=test;
        console.log('new JSON'+JSON.stringify(this.testJSON));

    }

    submitHandler()
    {
        console.log('here at submit');
        //var stringData=JSON.serialize(this.testJSON);
        //console.log('test12 '+stringData);
        var testdata=[];
        testdata=this.testJSON;
        console.log('test123'+JSON.stringify(testdata));
        jsonTestMethod({jsonData:JSON.stringify(this.testJSON)})
            .then(result => {
               // this.contacts = result;
               console.log('success');
            })
            .catch(error => {
               // this.error = error;
               console.log('error');
            });
    }

    addRow()
    {
        var staleData=this.data;
        var newId=0;
        for(var d in staleData)
        {
            if(staleData[d]['Id']>newId)
              newId=parseInt(staleData[d]['Id']);
        }
        newId=(newId+1).toString();
        staleData.push({
            'Id':newId,
            'checked':false,
            'name':'',
            'phone':'',
            'email':''
        });

        this.data=staleData;
        console.log('new JSON '+JSON.stringify(this.data));
        
    }

    nameChangeHandler(evt)
    {
        console.log('id '+evt.target.id);
        var data=this.data;
        for(var d in data)
        {
            if(data[d]['Id']==this.trimId(evt.target.id))
                {
                    data[d]['name']=evt.target.value;
                }
        }
        this.data=data;
        console.log('data new '+JSON.stringify(this.data));
    }

    emailChangeHandler(evt)
    {
        console.log('id '+evt.target.id);
        var data=this.data;
        for(var d in data)
        {
            if(data[d]['Id']==this.trimId(evt.target.id))
                {
                    data[d]['email']=evt.target.value;
                }
        }
        this.data=data;
        console.log('data new '+JSON.stringify(this.data));

    }

    phoneChangeHandler(evt)
    {
        console.log('id '+evt.target.id);
        var data=this.data;
        for(var d in data)
        {
            if(data[d]['Id']==this.trimId(evt.target.id))
                {
                    data[d]['phone']=evt.target.value;
                }
        }
        this.data=data;
        console.log('data new '+JSON.stringify(this.data));
    }

    handleAllChecked(evt)
    {
        for(var d in this.data)
        {
            this.data[d]['checked']=evt.target.checked;
        }
        if(evt.target.checked)
        {
            for(var d in this.data)
            {
                this.selectedRowsId.push(this.data[d]['Id']);
            }
        }
        else
        {
            this.selectedRowsId=[];
        }

    }

    handleSingleCheck(evt)
    {
        console.log('id'+this.trimId(evt.target.id)+' '+evt.target.checked);
        if(evt.target.checked)
        {
            this.selectedRowsId.push(evt.target.id);
        }
        else if(!(evt.target.checked) && this.selectedRowsId.includes(evt.target.id))
        {
            var indexToBeRemoved=this.selectedRowsId.indexOf(evt.target.id);
            //console.log('index to be removed '+indexToBeRemoved);
            this.selectedRowsId.splice(indexToBeRemoved,1);
        }

        console.log('selected ids List '+JSON.stringify(this.selectedRowsId));
    }

    handleRowDelete()
    {
        var selectedIdsList=this.selectedRowsId;
        for(var d in selectedIdsList)
        {
            for(var tableData in this.data)
            {
                if(this.trimId(selectedIdsList[d])==this.data[tableData]['Id'])
                {
                    this.data.splice(tableData,1);
                }
            }
        }
        console.log('table after delete '+JSON.stringify(this.data));
        this.selectedRowsId=[];

    }

    handleEmailFetch()
    {
        var dataToBePassed=[];
        if(this.selectedRowsId.length==0)
        {
            console.log('here in if ');
            this.showToastMessage('Error','No Rows Selected','error');
            
        }
        for(var d in this.selectedRowsId)
        {
            for(var dets in this.data)
            {
                if(this.trimId(this.selectedRowsId[d])==this.data[dets]['Id'])
                {
                    dataToBePassed.push(this.data[dets]);
                }
            }
        }
        //console.log('new dets '+JSON.stringify(dataToBePassed));
        handleEMailMethod({emailData:JSON.stringify(dataToBePassed)})
        .then(result => {
           // this.contacts = result;
           console.log('success '+JSON.stringify(result));
           for( var res in result)
           {
               for(var dets in this.data)
               {
                   if(result[res]['Id']==this.data[dets]['Id'])
                   {
                       this.data[dets]['phone']=result[res]['phone'];
                       break;

                   }
               }
           }

           
        })
        .catch(error => {
           // this.error = error;
           console.log('error'+JSON.stringify(error));
        });
    }

    showToastMessage(title,msg,variant)
    {
        console.log('hee in toast');
        const evt=new ShowToastEvent({
            title: title,
            message: msg,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    handleCustomChange(evt)
    {
        this.template.querySelector('c-hello-world').changeMessage(evt.target.value);
    }

    handleEvent(evt)
    {
        alert('evt information '+JSON.stringify(evt.detail));
        alert('new alert '+evt.newdetail);

    }
}