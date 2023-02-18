const express = require('express');
const taskPost = require('../models/taskPost');
const router  = express.Router();
const TaskPost = require('../models/taskPost');

router.get('/', async(req, res) => {
    try {
        const taskPosts = await TaskPost.find();
        res.status(200).json(taskPosts);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.post('/', async(req, res) => {
    const taskPost = new TaskPost({
        author: req.body.author,
        title: req.body.title,
        body: req.body.body,
        bounty: req.body.bounty,
        postDate: req.body.postDate
    })
    try {
        const newTaskPost = await taskPost.save();
        res.status(201).json(newTaskPost);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getTaskPost, async(req, res) => {
    try{
        await res.taskPost.remove();
        res.json({message : "Deleted Post"})
    } catch(err){
        res.status(500).json({message : err.message});
    }
})

async function getTaskPost(req, res, next){
    let taskPost;
    try{
        taskPost = await TaskPost.findById(req.params.id);
        if(taskPost == null){
            return res.status(404).json({message : "Cannot find post :("});
        } 
    } catch(err){
        res.status(500).json({message : err.message});
    }
    res.taskPost = taskPost;
    next();
}

module.exports = router;