const mongoose = require('mongoose');

const toySchema = new mongoose.Schema(
    {
        title: String,
        genre: {
           type: String,
           // check if value have in array
           enum: ['LEGO', 'Rubik', 'Chess', 'Jenga', 'Trampoline', 
           'Memory Game', 'Sports & Outdoor Play Toys', 'Remote & App Controlled Games',
           'Puzzles', 'UNO', 'Patin', 'Stuffed Animals'] ,
           message: '{VALUE} is not supported'
        },
        price: Number,
        description: String,
        image_link : String
    }
);
 toySchema.index({
    '$**': 'text'
 })

const Toy = mongoose.model('toy', toySchema);
module.exports = Toy;