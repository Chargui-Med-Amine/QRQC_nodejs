class Membre{
    constructor(id,firstName,lastName,fonction,password,imgUrl){
        this.id=id;
        this.password = password;
        this.imgUrl=imgUrl;
        this.firstName=firstName;
        this.lastName=lastName;
        this.fonction=fonction;
        
    }
    
} 
module.exports= Membre;