'user strict'

const app = require('./app')
// conexion a la base de datos
require('./database')

async function init(){
    await app.listen(3700)
    console.log('server on port 3700')
}

init()


