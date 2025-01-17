const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://arjavbadjate1709:VygkgfMuSIfAWpQM@cluster0.wjy2p.mongodb.net/EatBestmern?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
    
    // Fetch food items
    const foodItemsCollection = mongoose.connection.db.collection('fooditems');
    const foodItems = await foodItemsCollection.find({}).toArray();
    
    // Fetch food categories
    const foodCategoryCollection = mongoose.connection.db.collection('food_Category');
    const foodCategory = await foodCategoryCollection.find({}).toArray();
    
    // Assign the data to global variables
    global.fooditems = foodItems;
    global.food_Category = foodCategory;

    // Optionally, log data to verify
    console.log(global.fooditems);
    console.log(global.food_Category);

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = mongoDB;
