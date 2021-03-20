const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.path = {
            authPath:     '/api/auth',
            categories:   '/api/categories',
            users:        '/api/usuarios',
            products:     '/api/products',
            searches:     '/api/search',
        }


        //connect to DB
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.path.authPath, require('./routes/auth'));
        this.app.use( this.path.categories, require('./routes/categories'));
        this.app.use( this.path.users, require('./routes/usuarios'));
        this.app.use( this.path.products, require('./routes/products'));
        this.app.use( this.path.searches, require('./routes/searches'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
