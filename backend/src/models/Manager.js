class Manager {
    constructor({
        id,
        email,
        password,
        cpf,
        ownerId,
        fullName = null,
        birthdate = null,
        phoneNumber = null,
        department = null
    }){
        this.id = id;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
        this.ownerId = ownerId;
        this.fullName = fullName;
        this.birthdate = birthdate;
        this.phoneNumber = phoneNumber;
        this.department = department;
    }
}

module.exports = Manager;