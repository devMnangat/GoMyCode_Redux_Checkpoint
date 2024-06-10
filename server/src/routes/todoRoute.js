const router = require("express").Router()
const mongoose = require("mongoose")


const todosSchema = mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    completed: {type:Boolean, default:false},
    createdAt: {type:Date, default:Date.now}
})


// TodoModal- for connecting the schema with the mongoose

const TodoModal = mongoose.model("Todo", todosSchema)

// get all
router.get("/", async(req,res)=>{
    try {
        const fetchedTodos = await TodoModal.find({})
        if(!fetchedTodos) return res.status(404).send([])
        res.send(fetchedTodos)
    } catch (error) {
        res.status(500).send({msg :"An error has occurred " + error.message})
    }
})

// get one
.get("/:id", async(req,res)=>{
    try {
        const fetchedTodos = await TodoModal.findById(req.params.id)
        if(!fetchedTodos) return res.status(404).send([])
        res.send(fetchedTodos)
    } catch (error) {
        res.status(500).send({msg :"An error has occurred " + error.message})
    }
})

// post

.post("/", async(req,res)=>{
    try {
        const newTodo = new TodoModal(req.body)
        const savedTodo = await newTodo.save()
        if(!savedTodo) return res.status(400).send(savedTodo)
        res.status(201).send(savedTodo)
    } catch (error) {
        res.status(500).send({msg :"An error has occurred " + error.message})
    }
})

// pput

.put("/:id", async(req,res)=>{
    try {
        const updatedTodo = await TodoModal.findByIdAndUpdate(req.params.id, req.body)
        if(!updatedTodo) return res.status(404).send(updatedTodo)
        res.status(201).send(updatedTodo)
    } catch (error) {
        res.status(500).send({msg :"An error has occurred " + error.message})
    }
})

// delete

.delete("/:id", async(req,res)=>{
    try {
        const deleted = await TodoModal.findByIdAndDelete(req.params.id)
        if(!deleted) throw Error("todo not deleted")
        res.status(201).send({success:true, msg: "successfully deleted"})
    } catch (error) {
        res.status(500).send({msg :"An error has occurred " + error.message})
    }
})


module.exports = router

