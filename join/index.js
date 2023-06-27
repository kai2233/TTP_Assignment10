const express = require("express");
const router = express.Router();

const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'assignment10',
    password: '1536771545',
    port: 5432,
  })


router.get('/joinFourTable', async (req, res) => {
    await pool.query('SELECT employee_id,e.name,email,job_type,salary,project_name,employer.name as employer, company FROM employee e INNER JOIN employer ON e.employer_id = employer.employer_id INNER JOIN job ON e.job_code = job.job_code INNER JOIN projects ON e.project_num = projects.project_num',
    (error, result) => {
        try{
        res.send(result.rows);
        }catch(error){
            console.log(error);
        }   
    });
});

router.get('/joinThreeTable', async (req, res) => {
    await pool.query('SELECT job_type,employer.name AS employer,company,employee.name AS employee FROM job join employer using (job_code) join employee using (employer_id)',
    (error, result) => {
        try{
        res.send(result.rows);
        }catch(error){
            console.log(error);
        }   
    });
});

router.get('/joinTwoTable', async (req, res) => {
    await pool.query('select project_num,name,email,required_days,project_name from employee join projects using (project_num)',
    (error, result) => {
        try{
        res.send(result.rows);
        }catch(error){
            console.log(error);
        }   
    });
});

router.use((req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  next();
});

module.exports = router;