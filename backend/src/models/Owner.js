class Owner {
    constructor({
        id,
        email,
        password,
        fullName = null,
        restaurantName = null,
        cnpj = null
    }){
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.restaurantName = restaurantName;
        this.cnpj = cnpj;
    }
}

module.exports = Owner;