const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            authPath: '/api/auth',
            grupoUserPath: '/api/groupusers',
            itemsPath: '/api/items',
            usuariosPath: '/api/users'
        };

        // Conectar a base de datos.
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }


    listen(){
        this.app.listen(this.port , () => {
            console.log('Server corriendo', this.port);
        });
    }

    routes(){
        this.app.use(this.paths.authPath, require('../routes/auth.routes'));
        this.app.use(this.paths.grupoUserPath, require('../routes/groupUsers.routes'));
        this.app.use(this.paths.itemsPath, require('../routes/items.routes'));
        this.app.use(this.paths.usuariosPath, require('../routes/users.routes'));
    }

}


module.exports = Server;