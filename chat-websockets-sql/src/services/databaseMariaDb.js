const knex = require('knex')

class DB {
    constructor() {
        const options = {
            client: 'mysql',
            connection: {
                host: 'localhost',
                port: 3306,
                user: 'root',
                password: '',
                database: 'coderhouse'
            }
        };
        this.connection = knex(options);
    }

    init() {
        this.connection.schema.hasTable('products').then((exists) => {
            if (exists) return;
            return this.connection.schema.createTable('products', productsTable => {
                productsTable.increments();
                productsTable.string('name').notNullable();
                productsTable.integer('price')
                productsTable.string('image')
                productsTable.timestamps(true, true);
                }
            );
        });
    }

    get(tableName, id) {
        if (id) return this.connection(tableName).where('id', id);

        return this.connection(tableName);
    }

    create(tableName, data) {
        return this.connection(tableName).insert(data);
    }

    update(tableName, id, data) {
        return this.connection(tableName).where('id', id).update(data);
    }

    delete(tableName, id) {
        return this.connection(tableName).where('id', id).del();
    }
}

const DBServices = new DB()
module.exports = { DBServices }