const path = require('path')
const option = {
    client: 'sqlite3',
    connection: { filename: path.resolve('./DB/ecommerce.sqlite') },
    useNullAsDefault: true,
};
module.exports = {option}
