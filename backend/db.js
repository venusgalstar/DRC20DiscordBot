const dotenv = require('dotenv')
let mysql = require('mysql');

dotenv.config()

let DBHOST = process.env.DBHOST || 'localhost'
let DBUSER = process.env.DBUSER || 'root'
let DBPWD = process.env.DBPWD || ''
let DBNAME = process.env.DBNAME || 'discord'

let getConnection = () => {
    return mysql.createConnection({
        host: DBHOST,
        user: DBUSER,
        password: DBPWD,
        database: DBNAME
    });
}

let setCode= async (name, code, callback) => {
    let connection = mysql.createConnection({
        host: DBHOST,
        user: DBUSER,
        password: DBPWD,
        database: DBNAME
    });
    
    await connection.connect((err) => {
        if (err) throw err;
    });
    
    await connection.query('REPLACE INTO verification(name, code) VALUES (?, ?)', [name, code], async (err, result) => {
        callback();
        if(connection.state === "authenticated" || connection.state === "connected")
            await connection.destroy();
    });
}

let getCode = async (name, callback) => {
    let connection = getConnection();
    await connection.connect(async (err) => {
        if (err) throw err;
        await connection.query('SELECT code FROM verification WHERE name=? AND verified=0', [name], async (err, result) =>{
            let code = '';
            result.forEach(async (row) => {
                code = row.code;
            });
            callback(code);
            if(connection.state === "authenticated" || connection.state === "connected")
                await connection.destroy();
        });
    });
}

let getVerified = async (name, callback) => {
    let connection = getConnection();
    await connection.connect(async (err) => {
        if (err) throw err;
        await connection.query('SELECT verified FROM verification WHERE name=?', [name], async (err, result) =>{
            let verified = 0;
            result.forEach(async (row) => {
                verified = row.verified;
            });
            callback(verified);
            if(connection.state === "authenticated" || connection.state === "connected")
                await connection.destroy();
        });
    });
}

let setVerified= async (name, address, callback) => {
    let connection = mysql.createConnection({
        host: DBHOST,
        user: DBUSER,
        password: DBPWD,
        database: DBNAME
    });
    
    await connection.connect((err) => {
        if (err) throw err;
    });
    
    await connection.query('UPDATE verification SET address=?, verified=1 WHERE name=?', [address, name], async (err, result) => {
        callback();
        if(connection.state === "authenticated" || connection.state === "connected")
            await connection.destroy();
    });
}

module.exports = {setCode, getCode, getVerified, setVerified}