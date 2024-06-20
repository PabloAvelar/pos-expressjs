const { config } = require('dotenv');
const app = require('./app');

const PORT = config.port || 5000;
app.listen(PORT, ()=>{
    console.log(`Servidor activo: http://localhost:${PORT}/`)
})