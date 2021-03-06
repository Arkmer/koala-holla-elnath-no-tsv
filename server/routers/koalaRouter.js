const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.post('/', function(req, res){
    koalaObject = req.body

    const sqlText = `insert into koalas (name, age, gender, transfer, notes) values($1, $2, $3, $4, $5)`
    pool.query(sqlText, [koalaObject.name, koalaObject.age, koalaObject.gender, koalaObject.transfer, koalaObject.notes])
    .then(function(result){
        console.log('Added koala (not object)', result);
        res.send(201);
    })
    .catch(function(error){
        console.log('Error locating koala', error);
        res.sendStatus(500);
    })
});

router.get('/all', function(req, res){
    const sqlText = 'select * from koalas order by id;';
    pool.query(sqlText)
    .then(function(result){
        res.send(result.rows);
    }).catch(function(error){
        res.sendStatus(500);
    })
})

router.get('/transferables', function(req, res){
    const sqlText = `select * from koalas where transfer = 'true' order by id;`;
    pool.query(sqlText)
    .then(function(result){
        res.send(result.rows);
    }).catch(function(error){
        res.sendStatus(500);
    })
})

router.get('/nontransferables', function(req, res){
    const sqlText = `select * from koalas where transfer = 'false' order by id;`;
    pool.query(sqlText)
    .then(function(result){
        res.send(result.rows);
    }).catch(function(error){
        res.sendStatus(500);
    })
})

router.delete('/', function(req, res){
    koalaToDeleteId = req.body.id;
    const sqlText = `delete from koalas where id=${koalaToDeleteId}`;
    pool.query(sqlText)
    .then(function(result){
        console.log('"Deleted" koala', result);
        res.send(200);
    }).catch(function(error){
        console.log('Error, koala not deleted:', error);
        res.sendStatus(500);
    })
})

router.put('/transfer', function(req, res){
    id = req.body.id;
    const sqlText = `update koalas set transfer=True where id=${id}`;
    pool.query(sqlText)
    .then(function(result){
        console.log('Koala transfered', result);
        res.send(200);
    }).catch(function(error){
        console.log('Error, koala not transfered:', error);
        res.sendStatus(500);
    })
})

router.put('/keep', function(req, res){
    id = req.body.id;
    const sqlText = `update koalas set transfer=False where id=${id}`;
    pool.query(sqlText)
    .then(function(result){
        console.log('Koala kept', result);
        res.send(200);
    }).catch(function(error){
        console.log('Error, koala not kept:', error);
        res.sendStatus(500);
    })
})

router.put('/edit', function(req, res){
    note = req.body.note;
    id = req.body.id;
    const sqlText = `update koalas set notes=$1 where id=${id}`;
    pool.query(sqlText, [note])
    .then(function(result){
        console.log('Koala re-noted', result);
        res.send(200);
    }).catch(function(error){
        console.log('Error, koala not re-noted:', error);
        res.sendStatus(500);
    })
})

router.put('/age', function(req, res){
    id = req.body.id;
    const sqlText = `update koalas set age=age+1 where id=${id}`;
    pool.query(sqlText)
    .then(function(result){
        console.log('Koala gets older', result);
        res.send(200);
    }).catch(function(error){
        console.log('Error, koala not aging this year:', error);
        res.sendStatus(500);
    })
})

module.exports = router;