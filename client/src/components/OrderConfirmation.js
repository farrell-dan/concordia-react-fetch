import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const OrderConfirmation = () => {
	const [order, setOrder] = useState(null);
	const { orderId } = useParams();

	useEffect(() => {
		fetch(`/orders/${orderId}`)
		.then((response) => response.json())
		.then((data) => {
		  setOrder(data.data);
		})
		.catch((error) => {
		  console.error("Error fetching order information:", error);
		});
	}, [orderId]);

	return (
		<div>
		  <h2>Order Confirmation</h2>
		  {order ? (
			<div>
			  <p>Order ID: {order.id}</p>
			  <p>First Name: {order.fname}</p>
			  <p>Last Name: {order.lname}</p>
			  <p>Address: {order.address}</p>
			  <p>Email: {order.email}</p>
			  <p>Phone Number: {order.phone}</p>
			  <p>Pizza: {order.pizza}</p>
			  <p>Price: {order.price}</p>
			  {/* You can calculate and display the estimated delivery time here */}
			</div>
		  ) : (
			<p>Loading order information...</p>
		  )}
		</div>
	  );
	};

export default OrderConfirmation;