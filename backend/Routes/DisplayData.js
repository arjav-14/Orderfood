const express = require("express");
const router = express.Router();

router.post("/foodData" , (req , res)=>{
    try{
        console.log(global.fooditems ,global.food_Category );
        res.send([global.fooditems , global.food_Category]);
    }catch(error){
        console.error(error.message);
        res.send("server error")
    }
})


module.exports = router;