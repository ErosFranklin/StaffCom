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
        department = null,
        isActivated
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
        this.isActivated = isActivated;
    }
}

module.exports = Manager;