import { LightningElement, api } from 'lwc';

export default class Child extends LightningElement {
    @api imgSrc;
    connectedCallback()
    {
        console.log('in child componetnt test 123');
    }
    renderedCallback()
    {
        console.log('rendered child');
    }
    @api
    bulbOn()
    {
        this.imgSrc = 'https://www.kindpng.com/picc/m/158-1583460_yellow-light-bulb-bulb-png-transparent-background-png.png';
    }

    @api
    bulbOff()
    {
        this.imgSrc = 'https://www.vhv.rs/dpng/d/2-27579_transparent-transparent-background-light-bulb-hd-png-download.png';
    }
}