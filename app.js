const express = require('express');
const {Pool} = require('pg');
const PORT = 8080;
const app = express();
app.use(express.urlencoded({extended: false}));
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'assignment10',
  password: '',
  port: 5432,
})


app.post('/', async (req, res) => {
    pool.query('INSERT INTO employee (name,email,employer_id,job_code,project_num) VALUES ($1,$2,$3,$4,$5)',[req.body.name,req.body.email,req.body.employer_id,req.body.job_code,req.body.project_num]);
    res.status(201).send('Created user successfully');
});

app.get('/employee', async (req, res) => {
    await pool.query('SELECT * FROM employee',
    (error, result) => {
        try{
        res.send(result.rows);
        }catch(error){
            console.log(error);
        }   
    });
});
app.use("/join",require("./join"));



const serverRun = () =>{
    const server = app.listen(PORT,()=>{
        console.log('I am running on port:8080');
    });

}
serverRun();