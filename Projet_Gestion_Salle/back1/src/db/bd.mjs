import  pkg   from 'pg'; 
const { Pool } = pkg;
 export const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'Facturation',
    password:'rojo23',
    port:5432, // Port par défaut pour PostgreSQL

});