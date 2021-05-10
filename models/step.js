class Step{
    constructor(nom_machine,nom_panne,nom_step,controle,to_do,ordre){
        this.nom_machine=nom_machine;
        this.nom_panne=nom_panne;
        this.nom_step=nom_step;
        this.controle=controle;
        this.to_do=to_do;
        this.ordre=ordre;
        
    }
}
module.exports=Step;