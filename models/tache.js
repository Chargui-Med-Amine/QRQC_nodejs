class tache{
    constructor(id,description,date_limite,etat,id_emetteur){
        this.id=id;
        this.description=description;
        this.date_limite=date_limite;
        this.etat=etat;
        this.id_emetteur=id_emetteur;
        
    }
}
module.exports=tache;