class Step{
    constructor(nom_machine,nom_panne,nom_step,description_step,ordre){
        this.nom_machine=nom_machine;
        this.nom_panne=nom_panne;
        this.nom_step=nom_step;
        this.description_step=description_step;
        this.ordre=ordre;
        
    }
}
module.exports=Step;