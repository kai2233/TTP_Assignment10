//import pool from pg module
const {Pool} = require('pg');
//set up conntection to postgresql database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'assignment10',
    password: '',
    port: 5432,
  });
  module.exports = pool;