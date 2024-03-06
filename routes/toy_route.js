const express = require('express');
const router = express.Router();
const Toy = require('../models/toy')

// Index
router.get("/", async (req, res) => {
    try {
        const toys = await Toy.find().exec();
        res.render("toys", { toys });
    } catch (err) {
        console.error(err);
        res.send("Index broken....", err);
    }
});

// Create
router.post("/", async (req, res) => {
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
         try{
         const toy = await Toy.create(newToy)
             console.log(toy)
             res.redirect("/toys/" );
         }
         catch(err)  {
             console.log(err);
             res.redirect("/toys");
         }
    }
})

// New
router.get('/new', (req, res) => {
    res.render("toy_new");
})

//Search
router.get("/search", async(req,res) =>{
    try {
        const toys = await Toy.find({
          $text: {
            $search: req.query.term
          }  
        });
        res.render('toys', {toys})
    }catch(err){
        console.log(err);
        res.send("Search Faild")
    }
})
// Show
router.get("/:id", async (req,res) =>{
    try{
    const toy = await Toy.findById(req.params.id).exec()
    .then((toy)=>{
        res.render("toy_show", {toy})
    })}
    catch(err) {
        console.log(err);
        res.send("Show Fail",err)
    }
    
})

//Edit
router.get("/:id/edit", async (req,res) =>{
    // get the toy from DB
    try{
       const toy =  await Toy.findById(req.params.id).exec()
       res.render("toy_edit", {toy})
    }
    catch(err) {
        console.log(err);
        res.send("Edit Fail")
    }
})

// Update
router.put("/:id", async (req,res) =>{
    const genre = req.body.genre; 
   if (Toy.schema.path('genre').enumValues.includes(genre)) { 
            const toyBody = {
                title: req.body.title,
                genre,
                price: req.body.price,
                description: req.body.description,
                image_link: req.body.image_link
            }
        try{
            const toy = await Toy.findByIdAndUpdate(req.params.id, toyBody, {new:true}).exec()
            res.redirect(`/toys/${req.params.id}`)
        }
        catch(err) {
            console.log(err);
            res.send("Update Fail")
        }
   }

})


module.exports = router;