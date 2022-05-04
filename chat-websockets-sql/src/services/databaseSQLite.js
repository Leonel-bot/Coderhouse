const knex = require('knex')

class DBLite {
    constructor() {
        const options = {
            client: 'sqlite3',
            connection: { filename: './DB/ecommerce.sqlite' },
            useNullAsDefault: true,
        };
        this.connection = knex(options);
    }

    init() {
        this.connection.schema.hasTable('chats').then((exists) => {
            if (exists) return;
            return this.connection.schema.createTable('chats', chatsTable => {
                chatsTable.increments();
                chatsTable.string('email').notNullable();
                chatsTable.integer('message').notNullable();
                chatsTable.timestamps(true, true);
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

const DBLiteServices = new DBLite()
module.exports = { DBLiteServices }