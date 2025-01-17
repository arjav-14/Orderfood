const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post('/orderData', async (req, res) => {
    const { order_data, email, order_date } = req.body;

    if (!order_data || !email || !order_date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Add order_date to each order entry
    order_data.forEach(item => {
        item.Order_date = order_date;
    });

    try {
        let existingOrder = await Order.findOne({ email });
        
        if (!existingOrder) {
            // If email does not exist, create a new order
            await Order.create({
                email,
                order_data: [order_data]
            });
            return res.json({ success: true });
        } else {
            // If email exists, update the order data
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data } }
            );
            return res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server Error");
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
      const { email } = req.body;
  
      const orders = await Order.find({ email });
      
      if (orders && orders.length > 0) {
        res.json({ orderData: orders }); // Make sure 'orderData' is returned
      } else {
        res.status(404).json({ message: 'No orders found' });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
