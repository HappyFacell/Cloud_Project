let config = {
    db_user: process.env.DB_USER,
    password: process.env.DB_PWD,
    // db_name: 'DBProyecto',
    getUrl() {
        // return `mongodb+srv://${this.db_user}:${this.password}@proyectoweb1.elums.mongodb.net/${this.db_name}?retryWrites=true&w=majority`
        return `mongodb+srv://diego_ferreira:${this.password}@cloudproject.w5br33t.mongodb.net/${this.db_name}?retryWrites=true&w=majority`
    }
}

console.log(config, config.getUrl());

module.exports = config;
