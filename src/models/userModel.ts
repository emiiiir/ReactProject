export default class usersModel {
    Id!:string
    Name!:string
    UserName!:string
    Email!:string

    constructor(Id:string,Name:string,UserName:string,Email:string) {
        this.Id=Id;
        this.Name=Name;
        this.UserName=UserName;
        this.Email=Email;
    }
}

