const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mongourl = 'mongodb://localhost:27017/todolistdb';

const app = express();

app.engine('handlebars',exphbs());
app.set('view engine','handlebars');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));

const taskSchema = mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'not_done'
    }
});

const Task = mongoose.model('task',taskSchema);

mongoose.connect(mongourl,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false},(error,ok)=>{
    if(error) throw error;
    app.listen(3003,()=>console.log('listening...'));
});

app.get('/',(req,res)=>{
    Task.find({}).lean().exec((error,foundres)=>{
        if(error) throw error;
            res.render('index',{tasks:foundres});
    });
});

app.post('/status',(req,res)=>{
    const text = req.body.input_text;
    new Task({text:text}).save((err)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/done/status',(req,res)=>{
    const task_id = req.query.task_id;
    Task.findByIdAndUpdate(task_id,{status:'done'},(error)=>{
        if(error) throw error;
        res.redirect('/');
    });
});

app.get('/delete/status',(req,res)=>{
    const task_id = req.query.task_id;
    Task.findByIdAndDelete(task_id,(error)=>{
        if(error) throw error;
        res.redirect('/');
    });
});