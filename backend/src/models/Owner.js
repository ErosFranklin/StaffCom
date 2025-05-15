class Owner {
    constructor({
        id,
        email,
        password,
        fullName = null,
        restaurantName = null,
        cnpj = null,
        phoneNumber = null,
        isActivated
    }){
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.restaurantName = restaurantName;
        this.cnpj = cnpj;
        this.phoneNumber = phoneNumber;
        this.isActivated = isActivated;
    }
}

module.exports = Owner;