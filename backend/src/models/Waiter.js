class Waiter {
    constructor({
        id,
        fullName = null,
        birthdate = null,
        cpf,
        phoneNumber = null,
        email,
        password,
        managerId,
        isActivated = true,
    }){
        this.id = id;
        this.fullName = fullName;
        this.birthdate = birthdate;
        this.cpf = cpf;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.managerId = managerId;
        this.isActivated = isActivated;
    }
}

module.exports = Waiter;