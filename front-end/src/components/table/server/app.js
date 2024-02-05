const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let id=2;
const todoList=[
    {
    id:1,
    title:'할일 1',
    createAt: '2024-01-31',
    username: 'kimssafy'
},
];

app.get('/api/todo',(req, res)=>{
    res.json(todoList);
});

app.post('/api/todo',(req,res)=>{
    const {title, createAt, username}=req.body;
    console.log('req.body:', req.body);
    todoList.push({
        id:id++,
        title,
        createAt,
        username
    });
    return req.send('success');
});

app.listen(4000, ()=>{
    console.log('server start!!');
});