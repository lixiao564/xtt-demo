const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login/in.do', function(req, res) {
    const data = {
        code: 0,
        msg: '',
        data: 'success'
    };
    const body = req.body;
    if (body.staffCode == 'cadmin' && body.userSec == 'cadmin') {
        
    } else {
        data.code = -1;
    }
    setTimeout(() => {
        res.send(data);
    }, 1500);
});
app.get('/login/out.do', function(req, res) {
    const data = {
        code: 0,
        msg: '',
        data: ''
    };
    res.send(data);
});

app.all('/affairsList.do', function(req, res) {
    let data = {
        code: 0,
        data: {
            rows: [{
                id: 1
            }, {
                id: 2
            }],
            total: 2
        },
        msg: ''
    }
    setTimeout(() => {
        res.send(data);
    }, 1500);
});

app.post('/affairsWrite.do', function(req, res) {
    const data = {
        code: 0,
        msg: '',
        data: 'success'
    };
    setTimeout(() => {
        res.send(data);
    }, 1500);
});

app.listen(5001);