import { v2 as cloudinary } from 'cloudinary';
import Books from '../models/Books.model.js';


const addBook = async(req, res) => {

    try {
        
        const { title, author } = req.body;

        const image = req.file;

        if (!title || !author || !image) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const response = await cloudinary.uploader.upload(image.path, {
            resource_type: 'image',
            folder: 'books'
        });

        const newBook = new Books({
            title,
            author,
            image: response.secure_url
        });

        await newBook.save();

        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            book: newBook
        });

    } catch (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500).json({ success: false, message: 'Error in Adding Books' });
    }

}

const getAllBooks = async(req, res) => {

    try {
        
        const allBooks = await Books.find({});

        res.json({success:true, message:"All Books Retieve", allBooks});

    } catch (error) {
        console.log("Couldn't get all books");
        res.json({success:false, message:"Error in Get All Books"});
    }

}

const getSingleBook = async (req, res) => {

    try {

        const book = await Books.findById(req.params.id);

        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.status(200).json({ success: true, book });

    } catch (error) {
        console.log("Error in get single book");
        res.status(500).json({ success: false, message: 'Error retrieving book' });
    }
};


export {addBook, getAllBooks, getSingleBook};