class Panne{
    constructor(nom_machine,nom_panne,liste_steps,description_panne,temps_estime){
        this.nom_machine=nom_machine;
        this.nom_panne=nom_panne;
        this.liste_steps=liste_steps;
        this.description_panne=description_panne;
        this.temps_estime=temps_estime;
        
    }
}
module.exports=Panne;