import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const PizzaDetails = () => {
	const [state, setState] = useState(null);
	const { pizzaId } = useParams();

	useEffect(() => {
		fetch(`/pizzas/${pizzaId}`)
			.then((response) => response.json())
			.then((parsed) => {
				setState([parsed.data]);
			})
			.catch((error) => {
				console.error("Error fetching pizza details:", error);
			});
	}, [pizzaId]);

	return (
		<Page>
			{state ? (
				state.map((pizza) => (
					<Card key={pizza.id}>
						<Image src={pizza.src} alt={`${pizza.name} pizza`} />
						<PizzaInfo>
							<PizzaName>{pizza.name}</PizzaName>
							<PizzaDescription>{pizza.description}</PizzaDescription>
							<h2>Toppings:</h2>
							<PizzaDescription>{pizza.toppings}</PizzaDescription>
							<div>
								<h2>Prices:</h2>
								<PriceBoxContainer>
									{Object.entries(pizza.price).map(([size, price]) => (
										<PriceBox key={size}>
											<Size> {size}</Size>
											<Price>{price} </Price>
										</PriceBox>
									))}
								</PriceBoxContainer>
							</div>
							<OrderNowButton to={"/orders"}>🍕Order Now!🍕</OrderNowButton>
						</PizzaInfo>
					</Card>
				))
			) : (
				<h1>Loading menu...</h1>
			)}
		</Page>
	);
};

export default PizzaDetails;

const Page = styled.div`
	background-color: aliceblue;
	display: flex;
	margin-top: -100px;
	margin-left: 0;
	margin-right: 0;
	flex-direction: column;
	align-items: center;
	height: 100vh;
`;

const Card = styled.div`
	display: flex;
	margin: 10px;
	margin-top: 125px;
	margin-bottom: 50px;
	align-items: center;
	border: 1px solid black;
	border-radius: 8px;
	padding: 10px;
	position: relative;
	max-height: 700px;
`;
const Image = styled.img`
	width: 50%;
	max-height: 100%;
	margin-right: 25px;
	margin-top: 10px;
`;

const PizzaInfo = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	width: 50%;
	margin: 0px;
	flex-wrap: wrap;
`;

const PizzaName = styled.h2`
	display: flex;
	justify-content: center;
	font-size: xx-large;
`;

const PizzaDescription = styled.p`
	margin: 10px;
	display: flex;
	justify-content: center;
`;

const PriceBoxContainer = styled.div`
	display: flex;
	flex-wrap: wrap; /* This allows boxes to wrap to the next row */
	justify-content: center;
`;

const PriceBox = styled.div`
	display: flex;
	flex-direction: column; /* Change the flex-direction to column */
	border: 3px solid black;
	height: 100px;
	width: 100px;
	margin: 10px;
	justify-content: center;
	align-items: center;
`;

const Size = styled.p`
	display: block;
	margin: 0;
	margin-top: 10px;
	font-weight: bolder;
`;

const Price = styled.p`
	display: block;
	margin: 0;
	margin-top: 10px;
	text-decoration: underline;
`;

const OrderNowButton = styled(Link)`
	display: flex;
	justify-content: center;
	margin: 50px auto;
	width: 30%;
	background-color: #007bff;
	color: #fff;
	padding: 10px 20px;
	border: none;
	border-radius: 4px;
	text-decoration: none;
	cursor: pointer;
	transition: background-color 0.3s;
	&:hover {
		background-color: #0056b3;
	}
`;
