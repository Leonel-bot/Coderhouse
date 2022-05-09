const knex = require('knex');
const { option } = require('../options/sqlite');

class DBLite {
    constructor(options) {
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

const DBLiteServices = new DBLite(
    options = option
)
module.exports = { DBLiteServices }