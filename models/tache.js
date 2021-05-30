class tache{
    constructor(id,description,date_limite,date_affectation,etat,id_emetteur){
        this.id=id;
        this.description=description;
        this.date_limite=date_limite;
        this.date_affectation=date_affectation;
        this.etat=etat;
        this.id_emetteur=id_emetteur;
        
    }
}
module.exports=tache;