class Alerte{
    constructor(id_personne,date,heure,nom_alerte,nom_machine,description,etat,niveau){
        this.id_personne=id_personne;
        this.date=date;
        this.heure=heure;
        this.nom_alerte=nom_alerte;//nom de panne
        this.nom_machine=nom_machine;
        this.description=description;//description panne
        this.etat=etat;
        this.niveau=niveau;
    }
}
module.exports=Alerte;