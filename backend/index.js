const express = require("express");
var cors = require('cors')
const bodyParser = require("body-parser");
const dotenv = require('dotenv')
const mime = require('mime-types')
let { exec } = require ('child_process');
let mysql = require('mysql');
const axios = require('axios');

const bitcoin = require ('bitcoinjs-lib')
const bs58 = require('bs58')

let {setCode, getCode, getVerified, setVerified} = require ('./db.js');

const DOGECOIN_NETWORK = {
  messagePrefix: '\x19Dogecoin Signed Message:\n',
  bip32: {
    public: 0x02facafd,
    private: 0x02fac398,
  },
  pubKeyHash: 0x1e,
  scriptHash: 0x16,
  wif: 0x9e,
  bech32: '',
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

dotenv.config()

app.listen(4002,() => console.log("Server listening at port 4002"));

app.post("/verified", async (req, res, next) => {
    data = req.body;
    let username = data.username;
    getVerified(username, (verified)=>{
        res.send({verified:verified});
    });
});

app.post("/set_verified", async (req, res, next) => {
    data = req.body;
    let username = data.username;
    let hashcode = data.hashcode;
    let address = '';
    setVerified(username, address, (verified)=>{
        res.send({verified:verified});
    });
});

app.post("/code", async (req, res, next) => {
    data = req.body;
    let username = data.username;
    getCode(username, (code)=>{
        res.send({code:code});
    });
});

app.post("/set_code", async (req, res, next) => {
    data = req.body;
    let username = data.username;
    let code = data.code;
    setCode(username, code, (id)=>{
        res.send({result:'success'});
    });
});
