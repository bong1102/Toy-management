const mongoose = require('mongoose');

const toySchema = new mongoose.Schema(
    {
        title: {
        type: String,
        require: [true, 'Give the name(title) for this toy'],
        uniqued: true,
        trim: true
        },
        genre: {
           type: String,
           // check if value have in array
           enum: ['LEGO', 'Rubik', 'Chess', 'Jenga', 'Trampoline', 
           'Memory Game', 'Sports & Outdoor Play Toys', 'Remote & App Controlled Games',
           'Puzzles', 'UNO', 'Patin', 'Stuffed Animals'] ,
           message: '{VALUE} is not supported'
        },
        price: {
            type: Number,
            require: true
        },
        description: {
            type: String,
            trim: true
        },
        image_link: {
            type: String,
            required: [true, 'This toy must have a cover image']
        }
    }
);
 toySchema.index({
    '$**': 'text'
 })

const Toy = mongoose.model('toy', toySchema);
module.exports = Toy;