export default class Pagination{

    public firstPage:number=1;
    public lastPage:number=0;
    public actualPage:number=0;
    public totalRegister:number=0;
    public data:any;

    constructor( page,limit,totalRegister ){
        this.totalRegister = totalRegister;
        this.actualPage = page;
        this.lastPage = Math.ceil( totalRegister / limit );
    }

    static calculateTake( page,limit ){
        return (page==1)?0:((page-1)*limit);
    }

}