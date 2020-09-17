import { LightningElement } from 'lwc';

export default class NewBulbComponent extends LightningElement {
    imgSrc="https://www.vhv.rs/dpng/d/2-27579_transparent-transparent-background-light-bulb-hd-png-download.png";
    handleBulbOn()
    {
        this.template.querySelector('c-child').bulbOn();
    }
    connectedCallback()
    {
        console.log('in main component');
    }
    renderedCallback()
    {
        console.log('rendered parent');
    }

    handleBulbOff()
    {
        this.template.querySelector('c-child').bulbOff();
    }
}