const express = require('express');
const router = express.Router();
const Toy = require('../models/toy')

// Index
router.get("/" , (req, res) => {
    Toy.find().exec()
    .then((foundToy) =>{
    res.render("toys", {toys:foundToy}
    )})
    .catch((err) =>{
        console.log(err);
        res.send("Index broken....", err)
    })        

})

// Create
router.post("/", (req, res) => {
   // console.log(req.body);
    genre = req.body.genre; 
   if (Toy.schema.path('genre').enumValues.includes(genre)) { 
        const newToy = {
            title: req.body.title,
            genre,
            price: req.body.price,
            description: req.body.description,
            image_link: req.body.image_link
        }
        
        Toy.create(newToy)
        .then((toy) =>{
            console.log(toy)
            res.redirect('/toys/' + toy._id);
        })
        .catch((err)=>{
            console.log(err);
            res.redirect("/toys")
        })
   }
})

// New
router.get('/new', (req, res) => {
    res.render("toy_new");
})

//Search
router.get("/search", (req,res) =>{
    Toy.find({
        $text: {
            $search: req.query.term
        }
    }).then((toys) => {
        res.render('toys', { toys });
    }).catch((err) => {
        console.log(err);
        res.send("Search Failed");
    });
});
// Show
router.get("/:id", (req,res) =>{
    
    Toy.findById(req.params.id).exec()
    .then((toy)=>{
        res.render("toy_show", {toy})
    })
    .catch((err) =>{
        console.log(err);
        res.send("Show Fail",err)
    })
    
})

//Edit
router.get("/:id/edit",  (req,res) =>{
    // get the toy from DB
        Toy.findById(req.params.id).exec()
    .then((toy) =>{
        res.render("toy_edit", {toy})
    })
    .catch((err) =>{
        console.log(err);
        res.send("Edit Fail")
    })
})

// Update
router.put("/:id", (req,res) =>{
    const genre = req.body.genre; 
   if (Toy.schema.path('genre').enumValues.includes(genre)) { 
            const toyBody = {
                title: req.body.title,
                genre,
                price: req.body.price,
                description: req.body.description,
                image_link: req.body.image_link
            }
        Toy.findByIdAndUpdate(req.params.id, toyBody, {new:true}).exec()
        .then((updateToy) =>{
            console.log(updateToy);
            res.redirect(`/toys/${req.params.id}`)
        })
        .catch((err) =>{
            console.log(err);
            res.send("Update Fail")
        })
    }

})


module.exports = router;