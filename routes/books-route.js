import express, { Router }  from "express";
import { Book } from "../models/booksModels.js";

const router = express.Router();


router.post('/', async (req,res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'send all require field: title, author, publishYear'
            });

           
        };
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})
// routes for get all books
router.get('/', async(req, res) => {
        try {
            const books = await Book.find({});
            return res.status(200).json({
                count: books.length,
                data: books
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).send({
                message: error.message
            })
        }
})
// routes for single  books requesting
router.get('/:id', async(req, res) => {
    try {
        const {id } = req.params
        const books = await Book.findById(id);
        return res.status(200).json(books)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: error.message
        })
    }
})

// update the books
router.put('/:id', async(req,res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'send all required fields: title, author, publisher'
            })
        }

        const { id } = req.params;
        
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({
                message: 'Book not found'
            })
        }
        return res.status(200).send({
            message: "Book Updated successfully! "
        })
    }catch(error){
        console.log(error.message)
        res.status(500).send({
            message: error.message
    })
}
}
)
// route to delete books 
router.delete('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id)

        if(!result){
            return res.status(404).json({
                message: "Books not Found"
            })
        }
        
        return res.status(200).send({
            message: "Book delete Successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        })
    }
})

export default router