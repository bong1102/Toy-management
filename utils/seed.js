const Toy = require('../models/toy');



// create new toy
const toy_seeds = [
    {
        title: "Duck",
        genre:"Stuffed Animals",
        price:4,
        description:"A cute duck",
        image_link:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh8BjacyI_dcw4nsk5-i-Ke3sPOCJRZSRgZQ&usqp=CAU"
    },
    {
        title: "Peguin",
        genre:"Stuffed Animals",
        price:6,
        description:"A cute peguin",
        image_link:"https://plushiedepot.com/cdn/shop/products/11c24bc1beed81f3f477d1d8a32b4cfc.jpg?v=1667858818"
    },
    {
        title: "Dinosaur",
        genre:"Stuffed Animals",
        price:7,
        description:"A cute dinosaur",
        image_link:"https://i5.walmartimages.com/seo/T-Rex-Cute-Stuffed-Animal-Plush-Toy-Soft-Dinosaurs-Plush-Doll-Gifts-Toy-for-Kids-Plushies-and-Birthday-Gifts_7457e611-47fa-48b7-90cd-ca042493b66c.3cc30a3e4118e858cdf49e62e5eb8b3f.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
    }
]

const seed = async () => {
    // Delete all the current toy
    await Toy.deleteMany();
    console.log("Deleted all the toys before!");
    // Create new
    for (const toy_seed of toy_seeds) {
       let toy = await Toy.create(toy_seed);
       console.log("Create a new toy: ", toy.title);
    }
}

module.exports = seed;