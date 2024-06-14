const mongoose = require('mongoose');


const dbConnection = async() => {
    console.log('MONGODB_CNN:', process.env.MONGODB_CNN);
    
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos online');

    } catch(error) {
        
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};


module.exports = {
    dbConnection
}