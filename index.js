const express = require('express')
const mongoose = require('mongoose')


const app = express();
const PORT = 3001;

app.use(express.json({extended:true}))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/todo', require('./routes/todo.route'))

async function start (){
    try{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.peoin.mongodb.net/todo?retryWrites=true&w=majority',
        {useNewUrlParser:true, 
        useUnifiedTopology:true, 
        useCreateIndex:true, 
        useFindAndModify:true})
        app.listen(PORT,()=>console.log('db and server is work'))
    }catch(e){
        console.log(e);
    }
}
start()