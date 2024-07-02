// import express from "express"
// import bodypar from "body-parser"
// import { dirname } from "path"
// import { fileURLToPath } from "url"
// const __dirname = dirname(fileURLToPath(import.meta.url))

// const port = 3000
// const app = express()


// app.use(bodypar.urlencoded({ extended: true }));
// app.use(bodypar.json()); // this line is used to parse JSON data

// app.use(express.static(__dirname + "/public"))
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");


// let userid = null;
// let password = null;
// let username = null;
// let hashpwd = null;

// // DB codes
// import db from "mysql2"

// const pool = db.createPool({
//     host: "localhost",
//     user: "root",
//     password: "Rohith@123",
//     database: "protimer_rohith"
// }).promise()

// testDB()
// async function testDB(){

//     console.log(await pool.query("select * from user1 where sno = 1001;")[0] );

//     console.log("-------------------");


//     await pool.query("SELECT * FROM user1").then(function(){
//         console.log("DB is working");
//     })
// }

// // console.log("db is working");
// // const result = await pool.query("SELECT * FROM user1")
// // console.log(result);

// // const dummy1 ='2022-12-02'
// // const dummy2 = 340

// // await pool.query(`INSERT INTO user1(curr_date,time_spent) VALUES( '${dummy1}' , ${dummy2})`)


// app.get("/", function (req, res) {
//     res.render("index.ejs")
// })

// app.get("/login", function(req,res) {
//     res.render("login.ejs")
// })


// app.post("/login", async function(req,res){
//     username = req.body.username
//     password = req.body.password

//     hashpwd = await hashPassword(password)
//     // console.log(hashpwd);
//     console.log(username);

//     storeInDb()

//     async function storeInDb(){

//         const temp = await pool.query(`SELECT * FROM login WHERE usr = '${username}' ` )
//         // console.log(temp[0]);

//         const validation = await pool.query(`SELECT * FROM login WHERE usr = '${username}' AND pwd = '${hashpwd}' ` )
//         // console.log(validation);
//         if(validation[0].length != 0){
//             userid = validation[0].userid
//             return res.render("index.ejs", {datadb :username} )
//         }

//         else if (temp[0].length  == 0 ){
//             await pool.query(`INSERT INTO login(usr,pwd) VALUES( '${username}' , '${hashpwd}' )`)
//             console.log("Developer Rohith Vishnu");
//             return res.render("index.ejs", {datadb :username} )
//         }
//         else{
//             console.log("User Name Exists Try with other username");
//             res.render("error.ejs")
            
//         }    
//     }


//     async function hashPassword(password) {
//         const encoder = new TextEncoder();
//         const data = encoder.encode(password);
    
//         const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//         const hashArray =  Array.from(new Uint8Array(hashBuffer));
//         const hashHex =  hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
//         return hashHex;
//     }
// })




// app.post("/stats", function (req, res) {

//     // console.log(  "logging from index.js   " + JSON.stringify(req.body) );
//     // console.log("min------------" + req.body.minute * 60 );

//     const totalReceivedTime = (req.body.hour * 3600) + (req.body.minute * 60) + (req.body.seconds)

//     const davar = new Date()
//     const date = davar.getDate()
//     const month = davar.getMonth() + 1
//     const year = davar.getFullYear()

//     const totalDate = `${year}-${month}-${date}`

//     dataBase()

//     async function dataBase() {
//         const prev = await pool.query(`SELECT DATE_FORMAT(curr_date , '%Y-%c-%e') AS rohith from userdata WHERE usr = '${username}' AND pwd = '${hashpwd}' `)
//         // console.log(prev);
//         // console.log(prev[0][0].rohith); 
//         // console.log(totalDate); 
//         console.log(prev[0][0]);

//         if (prev[0][0] == undefined) {
//             console.log("logged from start");
//             await pool.query(`INSERT INTO user1(curr_date,time_spent) VALUES( '${totalDate}' , ${totalReceivedTime})`)
//             console.log("logged from start complete");
//         }

//         else if (prev[0][0].rohith == totalDate){
//             console.log("logged from equals");
//             const time_done = await pool.query(`Select time_spent from user1 where curr_date = '${totalDate}' `)
//             const pres_no = await pool.query(`SELECT sno FROM user1 order by sno DESC limit 1 `)

//             console.log("test logging", totalReceivedTime);

//             const updatedTime = (time_done[0][0].time_spent) + totalReceivedTime

//             await pool.query(`UPDATE user1 SET time_spent = ${updatedTime} WHERE sno = ${pres_no[0][0].sno} `)
//             console.log("logged from equals cmplete");
//         }
//         else {
//             console.log("logged from else");
//             await pool.query(`INSERT INTO user1(curr_date,time_spent) VALUES( '${totalDate}' , ${totalReceivedTime})`)
//             console.log("logged from else complete");
//         }
//     }

//     res.redirect("/stats")
// })




// app.get('/stats', async function (req, res) {
//     // const [rows, fields] = await pool.query("SELECT * FROM user1");
//     // const rows = await pool.query("SELECT * FROM user1");
//     await pool.query("SET time_zone = '+05:30';");

//     const [rows] = await pool.query("SELECT * FROM user1");

//     rows.forEach(row => {
//         row.curr_date = new Date(row.curr_date).toLocaleDateString('en-CA'); // Use 'en-CA' for YYYY-MM-DD format
//       });

//     // console.log( "This is ....---" , rows);

//     // let slicedDate = JSON.stringify(rows[0].curr_date)
//     // console.log(typeof slicedDate);
//     // slicedDate = slicedDate.substring(0,11)


//     // const data = {
//     //     sno : rows[0].sno,
//     //     date : slicedDate ,
//     //     time : rows[0].time_spent,
//     // }

//     // console.log(rows[0]);
//     // console.log(data);
//     // console.log(rows)

//     const data = JSON.stringify(rows)
//     // console.log("-------",data);
//     res.render("stats.ejs", { data: data })

// })



// app.listen(port, function () {
//     console.log(`Server started at port ${port}`);
// })












import express from "express";
import bodyParser from "body-parser";
import session from "express-session";  // for session
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import dotenv from "dotenv"
dotenv.config();
const SECRET_SESSION = process.env.SECRET_SESSION
const HOST_DB = process.env.HOST_DB
const USER_DB = process.env.USER_DB
const PASSWORD_DB = process.env.PASSWORD_DB
const DATABASE_DB = process.env.DATABASE_DB



const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Configure express-session
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));



// DB codes
import db from "mysql2";
const pool = db.createPool({
    host: HOST_DB,
    user: USER_DB,
    password: PASSWORD_DB,
    database: DATABASE_DB
}).promise();

testDB();
async function testDB() {
    await pool.query("SELECT * FROM user1").then(function() {
        console.log("DB is working");
    });
}





app.get("/", function (req, res) {
    res.render("index.ejs" , {datadb: req.session.username});
});


app.get("/login", function(req, res) {
    res.render("login.ejs");
});


app.post("/login", async function(req, res)
{
    const username = req.body.username;
    const password = req.body.password;

    const hashpwd = await hashPassword(password);
    console.log(username);

    await storeInDb();

    async function storeInDb()
    {
        const temp = await pool.query(`SELECT * FROM login WHERE usr = '${username}'`);
        const validation = await pool.query(`SELECT * FROM login WHERE usr = '${username}' AND pwd = '${hashpwd}'`);

        console.log(temp[0])
        console.log(temp[0][0].usr)

        // used for logging in
        if (validation[0].length != 0)
        {
            
            let userid = await pool.query(`SELECT userid FROM login WHERE usr = '${username}' AND pwd = '${hashpwd}' `)
            userid = userid[0][0].userid

            // Store username and hashpwd in session
            req.session.username = username;
            req.session.hashpwd = hashpwd;
            req.session.userid = userid;

            return res.render("index.ejs", { datadb: req.session.username });
        } 

        else if( temp[0][0].usr == username && temp[0][0].pwd != hashpwd)
        {
            let wrongpwd = "The Entered password Does not match. Try Again"
            res.render("login.ejs" , {wrongpwd : wrongpwd})
        }

        //used for signUP
        else if (temp[0].length == 0) 
        {
            
            await pool.query(`INSERT INTO login(usr,pwd) VALUES( '${username}', '${hashpwd}')`);
            console.log("Developer Rohith Vishnu");
            let userid = await pool.query(`SELECT userid FROM login WHERE usr = '${username}' AND pwd = '${hashpwd}' `)
            userid = userid[0][0].userid

            // Store username and hashpwd in session 
            req.session.username = username;
            req.session.hashpwd = hashpwd;
            req.session.userid = userid;
            return res.render("index.ejs", { datadb: username });
        }
        
        else
        {
            console.log("User Name Exists Try with other username");
            res.render("error.ejs");
        }
    }

    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
});




app.post("/stats", async function (req, res) {
    const totalReceivedTime = (req.body.hour * 3600) + (req.body.minute * 60) + (req.body.seconds);
    const davar = new Date();
    let date1 = davar.getDate();
    const date = date1.toString().padStart(2, '0');
    let month1 = davar.getMonth() + 1;
    const month = month1.toString().padStart(2, '0');
    const year = davar.getFullYear();
    const totalDate = `${year}-${month}-${date}`;

    const username = req.session.username;
    const hashpwd = req.session.hashpwd;
    const userid = req.session.userid;

    if (!username || !hashpwd) {
        return res.redirect("/login");
    }

    await dataBase();

    async function dataBase()
    {
        const prev = await pool.query(`SELECT DATE_FORMAT(date_user , '%Y-%m-%d') AS rohith from userdata JOIN login ON login.userid = userdata.userid WHERE usr = '${username}' AND pwd = '${hashpwd}' AND userdata.userid = ${userid} ORDER BY date_user DESC LIMIT 1`);
        
        // Creating New Record
        if (prev[0][0] == undefined) 
        {
            console.log("New record");
            await pool.query(`INSERT INTO userdata VALUES( ${userid}  ,'${totalDate}', ${totalReceivedTime}) `);
        } 

        
        // Updating Record
        else if (prev[0][0].rohith == totalDate)
        {
            console.log("Updating Record same date");
            let time_done = await pool.query(`Select time_user from userdata where date_user = '${totalDate}' AND userid = ${userid}`)

            console.log("test logging", totalReceivedTime);
            const updatedTime = (time_done[0][0].time_user) + totalReceivedTime;
            await pool.query(`UPDATE userdata SET time_user = ${updatedTime} WHERE userid = ${userid} AND date_user = '${totalDate}' `);
        }

        // same user creating new date record for an another day
        else
        {
            console.log("Updating DB with new date");
            await pool.query(`INSERT INTO userdata VALUES( ${userid} ,'${totalDate}', ${totalReceivedTime})`);
        }
    }

    res.redirect("/stats");
});





app.get('/stats', async function (req, res) {
    await pool.query("SET time_zone = '+05:30';");
    const [rows] = await pool.query(`SELECT * FROM userdata WHERE userid = ${req.session.userid} `);
    // console.log(rows);
    // console.log("---------------------------------------------------");
    // console.log(rows[0]);
    // console.log("---------------------------------------------------");
    // console.log(rows[0][0]);
    rows.forEach(row => {
        row.date_user = new Date(row.date_user).toLocaleDateString('en-CA');
    });

    const data = JSON.stringify(rows);
    // console.log(data);
    // console.log("________");
    res.render("stats.ejs", { data: data });
});




app.listen(port, function () {
    console.log(`Server started at port ${port}`);
});
