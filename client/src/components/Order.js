import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Order = () => {
	const [state, setState] = useState(null);
	const [customerInfo, setCustomerInfo] = useState({
		firstName: "",
		lastName: "",
		address: "",
		email: "",
		phoneNumber: "",
	});
	const [selectedPizza, setSelectedPizza] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`/pizzas`)
			.then((response) => response.json())
			.then((parsed) => {
				setState(parsed.data);
			})
			.catch((error) => {
				console.error("Error fetching pizza information:", error);
			});
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCustomerInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};

	const handlePizzaSelection = (event) => {
		const selectedPizzaId = event.target.value;
		setSelectedPizza(selectedPizzaId);
	};

	const handleSizeSelection = (event) => {
		const selectedSize = event.target.value;
		setSelectedSize(selectedSize);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (!selectedPizza || !selectedSize) {
			alert("Please select a pizza and size before placing the order.");
			return;
		}

		const orderData = {
			order: {
				fname: customerInfo.firstName,
				lname: customerInfo.lastName,
				address: customerInfo.address,
				email: customerInfo.email,
				phone: customerInfo.phoneNumber,
				pizza: selectedPizza,
				price: selectedSize,
			},
		};

		fetch("/orders", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(orderData),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					return response.text().then((errorText) => {
						throw new Error("Order creation failed.");
					});
				}
			})
			.then((order) => {
				console.log("Response Data:", order);
				navigate(`/confirm/${order.data.id}`);
			})
			.catch((error) => {
				alert("Order creation failed. Please try again.");
			});
	};

	return (
		<OrderPage>
			<OrderForm>
				<h2>Order Form</h2>
				<form onSubmit={handleFormSubmit}>
					<FormGroup>
						<label>First Name:</label>
						<input
							type="text"
							name="firstName"
							value={customerInfo.firstName}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<label>Last Name:</label>
						<input
							type="text"
							name="lastName"
							value={customerInfo.lastName}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<label>Address:</label>
						<input
							type="text"
							name="address"
							value={customerInfo.address}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<label>Email:</label>
						<input
							type="email"
							name="email"
							value={customerInfo.email}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<label>Phone Number:</label>
						<input
							type="tel"
							name="phoneNumber"
							value={customerInfo.phoneNumber}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<label>Select Pizza:</label>
						<select value={selectedPizza} onChange={handlePizzaSelection}>
							<option value="">Select a pizza</option>
							{state &&
								state.map((pizza) => (
									<option key={pizza.id} value={pizza.id}>
										{pizza.name}
									</option>
								))}
						</select>
					</FormGroup>
					{selectedPizza && (
						<FormGroup>
							<label>Price:</label>
							<SizeOptions>
								{Object.entries(
									state.find((pizza) => pizza.id === selectedPizza).price
								).map(([size, price]) => (
									<SizeOption key={size}>
										<input
											type="radio"
											name="size"
											value={price}
											checked={selectedSize === price}
											onChange={handleSizeSelection}
										/>
										{size}:{price}
									</SizeOption>
								))}
							</SizeOptions>
						</FormGroup>
					)}
					<>
						<ButtonContainer type="submit">Place Order</ButtonContainer>
					</>
				</form>
			</OrderForm>
		</OrderPage>
	);
};

export default Order;

const OrderPage = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60vh;
	background-color: aliceblue;
`;

const OrderForm = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	background-color: white;
	padding: 20px;
	border: 1px solid #ddd;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 50%;
	margin: 0 auto;

	h2{
		font-size: 5vh;
	}
	label{
		font-size: 2.5vh;
	}
	input{
		
	}
`;

const FormGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 15px;
`;

const SizeOptions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const SizeOption = styled.div`
	margin: 5px;
	justify-content: space-between;
`;

const ButtonContainer = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	margin-left: auto;
	margin-right: auto;
	font-size: 3vh;
	cursor: pointer;
`;
