require('dotenv').config()
const {Pool} = require('pg')

const pool = new Pool({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_DATABASE,
    ssl:true
});

pool.on('connect', ()=>{
    console.log("Database connected successfully")
})

pool.on('error', (err) => {
    console.error('Error on database',err);
})

pool.query('SELECT NOW()', (err, res) => {
    if (err){
        console.error('Database connection failed', err.message);
    } else {
        console.log('Database connection successful');
    }
});

async function initializedb(){
    try{
        await pool.query(
            
            `
             CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                Name VARCHAR(100) NOT NULL,
                price DECIMAL NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
             );

            `
        );
        console.log("Table created successfully");
    } catch (err) {
        console.error('Error creating table', err);
    }
}

initializedb();

module.exports=pool;





