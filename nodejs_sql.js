//Open Call Express 
const express = require('express')
const bodyParser = require('body-parser')
 
const mysql = require('mysql')
 
const app = express()
const port = process.env.PORT || 5000;
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//-------View-------//
app.set('view engine','ejs')
//Connect public folder
app.use(express.static('public'))
 
//MySQL Connect phpMyAdmin
const pool = mysql.createPool({
    connectionLimit : 10,
    connectionTimeout : 20,
    host : 'localhost', //www.google.com/sql or Server IP Address
    user : 'root',
    password : '',
    database : 'nodejs_lotterycheck' //Connect Database from beers.sql (Import to phpMyAdmin)
})
 
//GET (เรียกข้อมูลขึ้นมาดู) | POST (ส่งข้อมูลหน้า Website กลับเข้ามา)
//GET All Beers (lottery.sql)

var obj = {} //Global Variables

//สร้าง GET สำหรับรองรับการแสดงผลหน้า Front-End ส่วนของ POST ไว้บนสุด
app.get('/additem', (req, res) => {
    res.render('additem')
})
app.get('/profile', (req, res) => {
    res.render('profile')
})
app.get('',(req, res) => {
 
    pool.getConnection((err, connection) => {  //err คือ connect ไม่ได้ or connection คือ connect ได้ บรรทัดที่ 13-20
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`) //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา ใช้ได้ทั้ง 2 แบบ
         
        connection.query('SELECT * FROM lotterycheck', (err, rows) => { 
            connection.release();
            if(!err){ //ถ้าไม่ error จะใส่ในตัวแปร rows
                //Back-End : Postman Test --> res.send(rows)
                //Front-End :
                //ทำการ Package ข้อมูลที่ต้องการส่ง เพื่อจะให้สามารถส่งข้อมูลไปได้ทั้งชุุด

                //--------- Model of Data ---------//
                obj = { lotterycheck: rows, Error : err}

                //--------- Controller --------//
                res.render('index', obj)

            } else {
                console.log(err)
            }
         }) 
    })
})
 
//Copy บรรทัดที่ 24 - 42 มาปรับแก้ Code ใหม่
//สร้างหน้าย่อย ดึงข้อมูลเฉพาะ id ที่ต้องการ คือ 123, 124, 125
app.get('/:id',(req, res) => {
 
    pool.getConnection((err, connection) => {  //err คือ connect ไม่ได้ or connection คือ connect ได้ บรรทัดที่ 13-20
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`) //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา ใช้ได้ทั้ง 2 แบบ
 
        connection.query('SELECT * FROM lotterycheck WHERE `id` = ?', req.params.id, (err, rows) => { 
            connection.release();
            if(!err){ //ถ้าไม่ error จะใส่ในตัวแปร rows
                //res.send(rows)
                obj = {lotterycheck : rows, Error : err}
                res.render('showbyid', obj)
            } else {
                console.log(err)
            }
         }) 
    })
})
 

//Add New Get เปลี่ยน Path และใส่ตัวแปรไป 2 ตัวคือ name, 
app.get('//:number',(req, res) => {
 
    pool.getConnection((err, connection) => {  //err คือ connect ไม่ได้ or connection คือ connect ได้ บรรทัดที่ 13-20
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`) //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา ใช้ได้ทั้ง 2 แบบ
 
        connection.query('SELECT * FROM lotterycheck WHERE `number` = ?', req.params.number, (err, rows) => { 
            connection.release();
            if(!err){ //ถ้าไม่ error จะใส่ในตัวแปร rows
                //res.send(rows)
                obj = {lotterycheck : rows, Error : err}
                res.render('index', obj)
            } else {
                console.log(err)
            }
         }) 
    })
})

//(1)POST --> INSERT
//สร้าง Path ของเว็ปไซต์ additem
app.post('/additem',(req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err
        const params = req.body

            //Check
            pool.getConnection((err, connection2) => {
                connection2.query(`SELECT COUNT(id) AS count FROM lotterycheck WHERE id = ${params.id}`, (err, rows) => {
                    if(!rows[0].count){
                        connection.query('INSERT INTO lotterycheck SET ?', params, 
                        (err,rows) => {
                            connection.release()
                            if(!err){
                                //res.send(`${params.name} is complete adding item.`)
                                obj = {Error : err, mesg : `Success adding data ${params.name}`}
                                res.render('additem', obj)
                            } else {
                                console.log(err)
                            }
                        })
                    } else {
                        //res.send(`${params.name} do not insert data`)
                        obj = {Error : err, mesg : `Cannot adding data ${params.name}`}
                        res.render('additem', obj)
                    }
                })
            })
    }) 
})

//(2)DELETE
app.delete('/delete/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log("connected id : ?", connection.threadId)
        
        //ลบข้อมูลโดยใช้ id
        connection.query('DELETE FROM `lotterycheck` WHERE `lotterycheck`.`id` = ?', [req.params.id], (err, rows) => {
            connection.release()
            if(!err){
                res.send(`${req.params.id} is complete delete item.`)
            } else {
                console.log(err)
            }
        })
    })
})

//(3) PUT ทำการ UODATE ข้อมูลใน Database
app.put('/update', (req, res) => {
    pool.getConnection((err, connection) => {
        console.log("connected : id ? ", connection.threadId)

        //สร้างตัวแปรแบบกลุ่ม
        const {id, name, tagline, description, image} = req.body

        //Update ข้อมูลต่าง ๆ ตามลำดับโดยใช้เงื่อนไข id
        connection.query('UPDATE lotterycheck SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?', [name, tagline, description, image, id], (err,rows) => {
            connection.release()
            if(!err){
                res.send(`${name} is complete update item.`)
            } else {
                console.log(err)
            }
        })
    })
})



app.listen(port, () => 
    console.log("listen on port : ?", port)
    )