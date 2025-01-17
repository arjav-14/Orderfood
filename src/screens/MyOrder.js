import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  // Fetch order data
  const fetchMyOrder = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        console.error('User email is not found in localStorage');
        return;
      }
      
      const response = await fetch("http://localhost:4000/api/myOrderData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data && data.orderData) {
        setOrderData(data.orderData); // Update the state with the response
      } else {
        console.error('No order data found');
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  // Call fetchMyOrder when component is mounted
  useEffect(() => {
    fetchMyOrder();
  }, []); // Empty dependency array ensures it's called only once after the first render

  return (
    <div>
      <Navbar />

      <div className='container'>
        <div className='row'>
          {/* Check if orderData exists and is not empty */}
          {orderData && orderData.length > 0 ? (
            orderData.map((data, index) => (
              data.order_data && data.order_data.length > 0 ? (
                // Flattening the nested array with flat() and reverse the order
                data.order_data.flat().reverse().map((item, idx) => (
                  <div key={idx}>
                    {item.Order_date ? (
                      <div className='m-auto mt-5'>
                        <div>{item.Order_date}</div>
                        <hr />
                      </div>
                    ) : null}

                    <div className='col-12 col-md-6 col-lg-3'>
                      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                        {/* Removed the img tag */}
                        <div className="card-body">
                          <h5 className="card-title">{item.foodName || "Product Name"}</h5> {/* Using foodName */}
                          <div className='container w-100 p-0' style={{ height: "38px" }}>
                            <span className='m-1'>{item.quantity}</span>
                            <span className='m-1'>{item.portion}</span>
                            <span className='m-1'>{item.Order_date}</span>
                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                              ₹{item.totalPrice}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : null
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
