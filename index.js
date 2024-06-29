import express from "express"
import bodypar from "body-parser"
import { dirname } from "path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))

const port = 3000
const app = express()


app.use(bodypar.urlencoded({ extended: true }));
app.use(bodypar.json()); // this line is used to parse JSON data

app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


const userid = null;

// DB codes
import db from "mysql2"

const pool = db.createPool({
    host: "localhost",
    user: "root",
    password: "Rohith@123",
    database: "protimer_rohith"
}).promise()

testDB()
async function testDB(){

    console.log(await pool.query("select * from user1 where sno = 1001;")[0] );

    console.log("-------------------");


    await pool.query("SELECT * FROM user1").then(function(){
        console.log("DB is working");
    })
}

// console.log("db is working");
// const result = await pool.query("SELECT * FROM user1")
// console.log(result);

// const dummy1 ='2022-12-02'
// const dummy2 = 340

// await pool.query(`INSERT INTO user1(curr_date,time_spent) VALUES( '${dummy1}' , ${dummy2})`)


app.get("/", function (req, res) {
    res.render("index.ejs")
})

app.get("/login", function(req,res) {
    res.render("login.ejs")
})

app.post("/login", async function(req,res){
    const username = req.body.username
    const password = req.body.password

    const hashpwd = await hashPassword(password)
    // console.log(hashpwd);
    console.log(username);

    storeInDb()

    async function storeInDb(){

        

        // const temp = await pool.query("select * from login")
        // console.log(temp[0]);

        const temp = await pool.query(`SELECT * FROM login WHERE usr = '?' ` , [username] )
        // console.log(temp[0]);

        if (temp[0].length  == 0 ){
            await pool.query(`INSERT INTO login(usr,pwd) VALUES( '${username}' , '${hashpwd}' )`)
            console.log("Developer Rohith Vishnu");
            return res.render("index.ejs", {datadb :username} )
        }
        else{
            console.log("User Name Exists Try with other username");
        }

        const validation = await pool.query(`SELECT * FROM login WHERE usr = '?' AND pwd = '?' ` , [username,password])

        if(validation[0].length != 0){
            userid = validation[0].userid
        }
    }





    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
    
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray =  Array.from(new Uint8Array(hashBuffer));
        const hashHex =  hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    }
})


app.post("/stats", function (req, res) {

    // console.log(  "logging from index.js   " + JSON.stringify(req.body) );
    // console.log("min------------" + req.body.minute * 60 );

    const totalReceivedTime = (req.body.hour * 3600) + (req.body.minute * 60) + (req.body.seconds)

    const davar = new Date()
    const date = davar.getDate()
    const month = davar.getMonth() + 1
    const year = davar.getFullYear()

    const totalDate = `${year}-${month}-${date}`

    dataBase()

    async function dataBase() {
        const prev = await pool.query("SELECT DATE_FORMAT(curr_date , '%Y-%c-%e') AS rohith from user1 order by sno DESC limit 1")
        // console.log(prev);
        // console.log(prev[0][0].rohith); 
        // console.log(totalDate); 

        if (prev[0][0] == undefined) {
            console.log("logged from start");
            await pool.query(`INSERT INTO user1(curr_date,time_spent) VALUES( '${totalDate}' , ${totalReceivedTime})`)
            console.log("logged from start complete");
        }

        else if (prev[0][0].rohith == totalDate) {
            console.log("logged from equals");
            const time_done = await pool.query(`Select time_spent from user1 where curr_date = '${totalDate}' `)
            const pres_no = await pool.query(`SELECT sno FROM user1 order by sno DESC limit 1 `)

            console.log("test logging", totalReceivedTime);

            const updatedTime = (time_done[0][0].time_spent) + totalReceivedTime

            await pool.query(`UPDATE user1 SET time_spent = ${updatedTime} WHERE sno = ${pres_no[0][0].sno} `)
            console.log("logged from equals cmplete");
        }
        else {
            console.log("logged from else");
            await pool.query(`INSERT INTO user1(curr_date,time_spent) VALUES( '${totalDate}' , ${totalReceivedTime})`)
            console.log("logged from else complete");
        }
    }

    res.redirect("/stats")

})

app.get('/stats', async function (req, res) {
    // const [rows, fields] = await pool.query("SELECT * FROM user1");
    // const rows = await pool.query("SELECT * FROM user1");
    await pool.query("SET time_zone = '+05:30';");

    const [rows] = await pool.query("SELECT * FROM user1");

    rows.forEach(row => {
        row.curr_date = new Date(row.curr_date).toLocaleDateString('en-CA'); // Use 'en-CA' for YYYY-MM-DD format
      });

    // console.log( "This is ....---" , rows);

    // let slicedDate = JSON.stringify(rows[0].curr_date)
    // console.log(typeof slicedDate);
    // slicedDate = slicedDate.substring(0,11)


    // const data = {
    //     sno : rows[0].sno,
    //     date : slicedDate ,
    //     time : rows[0].time_spent,
    // }

    // console.log(rows[0]);
    // console.log(data);
    // console.log(rows)

    const data = JSON.stringify(rows)
    // console.log("-------",data);
    res.render("stats.ejs", { data: data })

})



app.listen(port, function () {
    console.log(`Server started at port ${port}`);
})