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
    host:'dpg-d7cdi9u7r5hc73f5eqtg-a.oregon-postgres.render.com',
    port:5432,
    database:'foodapp_dik3',
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
        console.error('Database connection failed', err.messgae);
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





