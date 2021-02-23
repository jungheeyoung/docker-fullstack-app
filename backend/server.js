const express = require("express");
const bodyParser = require('body-parser');
const db = require("./db");

const app = express();

//json 형태로 오는 요청의 본문을 해석할 수 있게 등록
app.use(bodyParser.json());
const PORT = 5000;

//테이블 생성
// db.pool.query(`CREATE TABLE list(
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fields)=>{
//     console.log('result', results)
// })

//db list table에 있는 모든 데이터를 프론트 서버에 보내주기
app.get('/api/values', (req, res)=>{
    //db에서 모든 정보 가져오기
    db.pool.query('SELECT * FROM lists;',
    (err, results, fields) => {
        if(err)
            return res.status(500).send(err);
        else
            return res.json(results);
    });
});

//클라이언트에서 입력한 값을 데이터베이스 listss 테이블에 넣어주기
app.post('/api/value', (req, res, next)=>{
    //db에 값 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES ("${req.body.value}")`,
    (err, results, fields) => {
        if(err)
            return res.status(500).send(err);
        else
            return res.json({success: true, value: req.body.value});
    });
});

app.listen(PORT, ()=>{
    console.log(`Running on test http://${PORT}`);
});