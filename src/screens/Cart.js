import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useCartDispatch } from '../components/ContextReducer';

export default function Cart() {
    const data = useCart();
    const dispatch = useCartDispatch();

    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            alert("Please log in first.");
            return;
        }
    
        // Map cart data to the correct structure
        const formattedOrderData = data.map(item => ({
            foodName: item.name,
            quantity: item.qty,
            portion: item.size,
            totalPrice: item.price,
        }));
    
        try {
            const response = await fetch("http://localhost:4000/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_data: formattedOrderData,
                    email: userEmail,
                    order_date: new Date().toDateString(),
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error placing order:", errorData.message || response.statusText);
                alert(`Failed to place order: ${errorData.message || "Unknown error"}`);
                return;
            }
    
            // If successful
            dispatch({ type: "DROP" });
            alert('Order placed successfully!');
        } catch (error) {
            console.error("Error during checkout:", error);
            alert('An error occurred while placing the order. Please try again later.');
        }
    };
    

    const totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className="table table-hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn p-0"
                                        onClick={() => dispatch({ type: "REMOVE", index })}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
                </div>
                <div>
                    <button className="btn bg-success mt-5" onClick={handleCheckOut}>
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    );
}
