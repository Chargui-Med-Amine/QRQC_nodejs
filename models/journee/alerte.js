class Alerte{
    constructor(id_personne,date,heure,nom_alerte,nom_machine,description,etat){
        this.id_personne=id_personne;
        this.date=date;
        this.heure=heure;
        this.nom_alerte=nom_alerte;
        this.nom_machine=nom_machine;
        this.description=description;
        this.etat=etat;
    }
}
module.exports=Alerte;