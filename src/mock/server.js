const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', function (req, res) {
    setTimeout(() => {
        res.send({
            code: 0,
            data: {
                rows: [
                    {
                        name: 'li xiao 1',
                        age: 2012
                    },
                    {
                        name: 'li xiao 2',
                        age: 2013
                    },
                    {
                        name: 'li xiao 3',
                        age: 2014
                    },
                    {
                        name: 'li xiao 4',
                        age: 2015
                    },
                    {
                        name: 'li xiao 5',
                        age: 2016
                    },
                    {
                        name: 'li xiao 6',
                        age: 2017
                    },
                    {
                        name: 'li xiao 7',
                        age: 2012
                    },
                    {
                        name: 'li xiao 8',
                        age: 2013
                    },
                    {
                        name: 'li xiao 9',
                        age: 2014
                    }, {
                        name: 'li xiao 10',
                        age: 2015
                    },
                    {
                        name: 'li xiao 11',
                        age: 2016
                    },
                    {
                        name: 'li xiao 12',
                        age: 2017
                    }
                ],
                total: 12
            }
        });
    }, 3000);
});

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

app.delete('/delete.do', function(req, res) {
    const data = {
        code: 0,
        msg: '',
        data: ''
    };
    setTimeout(() => {
        res.send(data);
    }, 1500);
});

app.put('/edit.do', function(req, res) {
    const data = {
        code: 0,
        msg: '',
        data: ''
    };
    setTimeout(() => {
        res.send(data);
    }, 1500);
});

app.post('/add.do', function(req, res) {
    const data = {
        code: 0,
        msg: '',
        data: ''
    };
    setTimeout(() => {
        res.send(data);
    }, 1500);
});

app.post('/upload.do', function(req, res) {
    const data = {
        code: 0,
        msg: '',
        data: ''
    };
    setTimeout(() => {
        res.send(data);
    }, 1500);
});

app.get('/list.do', function(req, res) {
    console.log(req.query);
    const data = {
        code: 0,
        msg: '',
        data: {
            rows: [{
                    id: '62',
                    name: '02.xml',
                    type: '软件配置文件',
                    group: 'PC终端',
                    dateTime: '2013-06-25',
                    flag: '有效'
                },
                {
                    id: '205',
                    name: '200.xml',
                    type: '业务系统配置',
                    group: 'win7系统',
                    dateTime: '2018-11-02',
                    flag: '无效'
                }
            ],
            total: 2
        }
    };
    if (req.query.group == 'win7系统') {
        data.data.rows.pop();
    }
    setTimeout(() => {
        res.send(data);
    }, 2000);
});

app.get('/main', function(req, res) {
    console.log(req.query);
    const data = {
        code: 0,
        msg: '',
        data: {
            rows: [{
                   id:'158',
                   name:'金牛西华分局',
                   upgrade:'金牛西区分公司'
                },
                {
                    id:'159',
                   name:'金牛泉水分局',
                   upgrade:'金牛西区分公司'
                }
            ],
            total: 2
        }
    };
    setTimeout(() => {
        res.send(data);
    }, 2000);
});

app.get('/assignlist', function(req, res) {
    console.log(req.query);
    const data = {
        code: 0,
        msg: '',
        data: {
            rows: [{
                   name:'windows',
                   group:'win7系统',
                   time:'2018-01-01',
                   type:'共有'
                },
                {
                    name:'windows',
                    group:'win7系统',
                    time:'2018-01-01',
                    type:'共有'
                 },
            ],
            total: 2
        }
    };
    
    setTimeout(() => {
        res.send(data);
    }, 2000);
});
app.get('/applist', function(req, res) {
    const data= {
        code: 0,
        msg: "",
        data:{
            rows:[
                {
                    name:'百度',
                    ip:'133.37.116.162',
                    address:'http://wwww.baidu.com',
                    status:'有效',
                    flag:'否',
                    browser:'谷歌浏览器',
                    see:'是',
                },
                {
                    name:'腾讯',
                    ip:'133.37.116.162',
                    address:"http://www.baidu.com",
                    status:'有效',
                    flag:'否',
                    browser:'谷歌浏览器',
                    see:'是',
                },
                {
                    name:'搜狐',
                    ip:'133.37.116.162',
                    address:'http://wwww.baidu.com',
                    status:'有效',
                    flag:'否',
                    browser:'谷歌浏览器',
                    see:'是',
                },
                {
                    name:'新浪',
                    ip:'133.37.116.162',
                    address:'http://wwww.baidu.com',
                    status:'有效',
                    flag:'否',
                    browser:'谷歌浏览器',
                    see:'是',
                }
            ],
            total:4
        }
    };
    setTimeout(()=>{
        res.send(data);
    },2000);
});

app.get('/trainlist', function(req, res) {
    const data= {
        code: 0,
        msg: "",
        data:{
            rows:[
                {
                    name:'无限通38元新装受理',
                    type:'操作手册',
                    class1:'业管中心',
                    class2:'操作手册汇总',
                    class3:'',
                    large:'120M',
                    clickNum:'812',
                    user:'admin',
                    time:'2018-01-01',
                    flag:'否'

                },
                {
                    name:'无限通38元新装受理',
                    type:'操作手册',
                    class1:'业管中心',
                    class2:'操作手册汇总',
                    class3:'',
                    large:'120M',
                    clickNum:'812',
                    user:'admin',
                    time:'2018-01-01',
                    flag:'否'

                },
                {
                    name:'无限通38元新装受理',
                    type:'操作手册',
                    class1:'业管中心',
                    class2:'操作手册汇总',
                    class3:'',
                    large:'120M',
                    clickNum:'812',
                    user:'admin',
                    time:'2018-01-01',
                    flag:'否'

                },
                {
                    name:'无限通38元新装受理',
                    type:'操作手册',
                    class1:'业管中心',
                    class2:'操作手册汇总',
                    class3:'',
                    large:'120M',
                    clickNum:'812',
                    user:'admin',
                    time:'2018-01-01',
                    flag:'否'

                },
                {
                    name:'无限通38元新装受理',
                    type:'操作手册',
                    class1:'业管中心',
                    class2:'操作手册汇总',
                    class3:'',
                    large:'120M',
                    clickNum:'812',
                    user:'admin',
                    time:'2018-01-01',
                    flag:'否'

                },
                {
                    name:'无限通38元新装受理',
                    type:'操作手册',
                    class1:'业管中心',
                    class2:'操作手册汇总',
                    class3:'',
                    large:'120M',
                    clickNum:'812',
                    user:'admin',
                    time:'2018-01-01',
                    flag:'否'

                },
            ],
            total:6
        }
    };
    setTimeout(()=>{
        res.send(data);
    },2000);
});
app.get('/softlist', function(req, res) {
    const data= {
        code: 0,
        msg: "",
        data:{
            rows:[
                {
                    name:'widows',
                    version:'4.19',
                    type:'保护',
                    download:'2',
                    large:'120M',
                    user:'admin',
                    time:'2018-01-01'
                },
                {
                    name:'widows',
                    version:'4.19',
                    type:'保护',
                    download:'2',
                    large:'120M',
                    user:'admin',
                    time:'2018-01-01'
                },
                {
                    name:'widows',
                    version:'4.19',
                    type:'保护',
                    download:'2',
                    large:'120M',
                    user:'admin',
                    time:'2018-01-01'
                },
                {
                    name:'widows',
                    version:'4.19',
                    type:'保护',
                    download:'2',
                    large:'120M',
                    user:'admin',
                    time:'2018-01-01'
                }
            ],
            total:4
        }
    };
    setTimeout(()=>{
        res.send(data);
    },2000);
});
 
app.get('/list.expert',function(req,res){
    console.log(req.body);
    const data = {
        code: 0,
        msg:'',
        data:{
            rows:[{
                id:32,
                name:'lin',
                type1:'高级专家',
                type2:'省部级',
                time:'2018-01-01',
                flag:'在线'
            },
            {
                id:33,
                name:'xin',
                type1:'高级专家',
                type2:'省部级',
                time:'2018-01-02',
                flag:'在线'
            }
            ],
            total:2
        }
    };
    setTimeout(()=>{
        res.send(data);
    },2000);
});
app.put('/edit.do', function(req, res) {
    console.log(req.body);
    const data = {
        code: 0,
        msg: '',
        data: 'edit success'
    };
    setTimeout(() => {
        res.send(data);
    }, 1000);
});

app.delete('/delete', function(req, res){
    console.log(req.body);
    const data ={
        code: 0,
        msg: '',
        data: 'delete success'
    };
    setTimeout(()=>{
        res.send(data);
    },1000);
});
app.get('/axios', function(req, res) {
    console.log(req.query);
    setTimeout(() => {
        res.send({
            code: 0,
            data: ''
        });
    }, 2000);
}); 
app.delete('/axios', function(req, res) {
    console.log(req.query);
    res.send({
        code: 0,
        data: ''
    });
}); 
app.post('/axios', function(req, res) {
    console.log(req.body);
    res.send({
        code: 0,
        data: ''
    });
}); 
app.put('/axios', function(req, res) {
    console.log(req.body);
    res.send({
        code: 0,
        data: ''
    });
}); 
app.get('/terminalList', function(req, res) {
    const data= {
        code: 0,
        msg: "",
        data:{
            rows:[
                {
                    machineNumber:'1',
                    owner:'dmy',
                    phone:'123',
                    onlineflag:'否',
                    lastResponseTime:'2018-1-1',
                    machineType:'营业终端',
                    keyReset:'重置密码',
                    status:'开启',
                    monitor:'开启',
                    registerTime:'2018-1-1',
                    hallName:'dmy',
                    netAddress:'一个',
                    resource:'查看',
                    identifier:'1'
                },
                {
                    machineNumber:'2',
                    owner:'dmy',
                    phone:'123',
                    onlineflag:'否',
                    lastResponseTime:'2018-1-1',
                    machineType:'营业终端',
                    keyReset:'重置密码',
                    status:'开启',
                    monitor:'开启',
                    registerTime:'2018-1-1',
                    hallName:'dmy',
                    netAddress:'一个',
                    resource:'查看',
                    identifier:'1'
                }           
              
            ],
            total:2
        }
    };
    setTimeout(()=>{
        res.send(data);
    },2000);
});
app.get('/hallList', function(req, res) {
    const data= {
        code: 0,
        msg: "",
        data:{
            rows:[
                {
                    abbrName:'dmy',
                    name:'dmy',
                    machineNum:'1',
                    userNum:'2',
                    belongArea:'安徽',
                    agentName:'dmy',
                    phone:'123',
                    time:'2018-1-1',
                    address:'anhui',
                    remark:'一个'
                },
                {
                    abbrName:'dmy',
                    name:'dmy',
                    machineNum:'23',
                    userNum:'2',
                    belongArea:'安徽',
                    agentName:'dmy',
                    phone:'123',
                    time:'2018-1-1',
                    address:'anhui',
                    remark:'一个'
                }           
              
            ],
            total:2
        }
    };
    setTimeout(()=>{
        res.send(data);
    },2000);
});
app.get('/agentList', function(req, res) {
    const data= {
        code: 0,
        msg: "",
        data:{
            rows:[
                {
                    agentNum:'1',
                    agentName:'qqq',
                    phone:'123',
                    keyReset:'重置密码',
                    registerTime:'2018-1-1',
                    belongArea:'anhui',
                    remark:'一个'
                },
                {
                    agentNum:'2',
                    agentName:'qqq',
                    phone:'123',
                    keyReset:'重置密码',
                    registerTime:'2018-1-1',
                    belongArea:'anhui',
                    remark:'一个'
                }           
              
            ],
            total:2
        }
    };
    setTimeout(()=>{
        res.send(data);
    },2000);
});
app.get('/officeUser', function(req, res) {
    const data= {
        code: 0,
        msg: "",
        data:{
            rows:[
                {
                    UserName:'dmy',
                    cellphone:'123',
                    phone:'123',
                    keyReset:'重置密码',
                    expertSet:'123',
                    mac:'111',
                    mailbox:'111'
                },
                {
                    UserName:'dmy',
                    cellphone:'1234',
                    phone:'123',
                    keyReset:'重置密码',
                    expertSet:'123',
                    mac:'111',
                    mailbox:'111'
                }           
              
            ],
            total:2
        }
    };
    setTimeout(()=>{
        res.send(data);
    },2000);
});
app.get('/userList', function(req, res) {
    const data= {
        code: 0,
        msg: "",
        data:{
            rows:[
                {
                    userNumber:'123',
                    userName:'dmy',
                    belongDepartment:'anhui',
                    roleGroup:'juese',
                    mailBox:'123',
                    phone:'111',
                    userLogout:'out'
                },
                {
                    userNumber:'123',
                    userName:'dmy',
                    belongDepartment:'anhui',
                    roleGroup:'juese',
                    mailBox:'123',
                    phone:'111',
                    userLogout:'in'
                }           
              
            ],
            total:2
        }
    };
    setTimeout(()=>{
        res.send(data);
    },2000);
});
app.listen(5001);