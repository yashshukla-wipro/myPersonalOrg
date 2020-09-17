import { LightningElement,track } from 'lwc';
import retList from '@salesforce/apex/NewLWCClass.quesansmethod';

export default class Newquesanslwc extends LightningElement {
    @track quesdata=[];
    connectedCallback()
    {
        retList().then(
            result=>{
                console.log('success '+JSON.stringify(result));
                var id=0;
                for(var d in result)
                {
                    var answersList=[];
                    answersList=result[d]['ansList'];
                    this.quesdata.push({
                        'id':d,
                        'ques':result[d]['ques'],
                        'ans':answersList
                    })
                   
                }

                console.log('quesDataList '+JSON.stringify(this.quesdata));

            }
        )
        .catch(error=>{
            console.log('error '+JSON.stringify(error));
        })
    }
}