import { LightningElement } from 'lwc';

export default class MyComponent extends LightningElement {
    connectedCallback()
    {
        const newEvent = new CustomEvent('myeventfromcomponentlwc',{
            detail:'this is call from my component data ',
            bubbles:true,
            composed:true
        });

        this.dispatchEvent(newEvent);

    }
}