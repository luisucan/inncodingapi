export default class Convert{

    static number( value:string ){
        const regex = /^[0-9]*$/;
        if( !regex.test(value) ) throw `"${value}" is not a number`
        return parseInt( value );
    }

}