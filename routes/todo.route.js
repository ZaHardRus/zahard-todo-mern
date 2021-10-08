const {Router} = require('express')
const router = new Router()
const Todo = require('../models/Todo')

router.post('/add', async (req,res)=> {
    try{
        const {text, userId} = req.body

        const todo = await new Todo({
            text,
            owner: userId,
            completed:false,
            important:false,
        })

        todo.save()
        return res.status(201).json([{message:'Задача добавлена', todo:todo}])
    }catch(e){
        console.log(e)
    }
})

router.get('/', async (req,res) => {
    try{
        const {userId} = req.query
        const todos = await Todo.find({owner: userId})
        return res.json(todos) 
    }catch(e){
        console.log(e)
    }
})

router.delete('/delete/:id', async (req,res) => {
    try{
        const todo = await Todo.findOneAndDelete({_id:req.params.id})
        return res.json(todo) 
    }catch(e){
        console.log(e)
    }
})

router.put('/completed/:id',async(req,res)=>{
    try{
        const todo = await Todo.findOne({_id:req.params.id})
        todo.completed = !todo.completed
        await todo.save()

        return res.json(todo) 
    }catch(e){
        console.log(e)
    }
})

router.put('/important/:id',async(req,res)=>{
    try{
        const todo = await Todo.findOne({_id:req.params.id})
        todo.important = !todo.important
        await todo.save()

        return res.json(todo) 
    }catch(e){
        console.log(e)
    }
})

module.exports = router