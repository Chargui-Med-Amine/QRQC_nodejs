class Membre{
    constructor(id,firstName,lastName,fonction,password,ImgUrl){
        this.id=id;
        this.password = password;
        this.ImgUrl=ImgUrl;
        this.firstName=firstName;
        this.lastName=lastName;
        this.fonction=fonction;
        
    }
    
} 
module.exports= Membre;