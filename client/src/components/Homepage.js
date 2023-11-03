import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Homepage = () => {
	const [state, setState] = useState(null);

	useEffect(() => {
		fetch("/pizzas")
			.then((response) => response.json())
			.then((parsed) => {
				setState(parsed.data);
			});
	}, []);

	return (
		<Page>
			<Title> Pizza Time!</Title>
			{state ? (
				state.map((pizza) => (
					<PizzaCard key={pizza.id}>
						<Image src={pizza.src} alt={`${pizza.name} pizza`} />
						<PizzaDetails>
							<PizzaName>{pizza.name}</PizzaName>
							<PizzaDescription>{pizza.description}</PizzaDescription>
							<PizzaToppings>
								<strong>Toppings:</strong> {pizza.toppings}
							</PizzaToppings>
							<PizzaPrice>
								Starting at: <strong>{pizza.price.Small}</strong>
							</PizzaPrice>
						</PizzaDetails>
						<MoreInfoButton to={`/pizza-details/${pizza.id}`}>
							More info
						</MoreInfoButton>
					</PizzaCard>
				))
			) : (
				<LoadingMessage> Loading menu...</LoadingMessage>
			)}
		</Page>
	);
};

export default Homepage;

const Page = styled.div`
	background-color: aliceblue;
	display: flex;
	margin-top: -100px;
	margin-left: 0;
	margin-right: 0;
	flex-direction: column;
	align-items: center;
`;
const Title = styled.h1`
	padding-top: 100px;
	font-size: 48px;
	text-decoration: underline;
	background: linear-gradient(to right, green, white, red);
	background-clip: none;
	-webkit-background-clip: text;
	color: transparent;
	-webkit-text-stroke: 0.5px black;
`;
const PizzaCard = styled.div`
	display: flex;
	margin: 10px;
	align-items: center;
	width: 700px;
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 10px;
	position: relative;
`;

const Image = styled.img`
	width: 350px;
	height: 350px;
	margin-right: 25px;
`;

const PizzaDetails = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	width: 350px;
	margin: 0px;
	flex-wrap: wrap;
`;

const PizzaName = styled.h2`
	display: flex;
	justify-content: center;
	margin-top: 10px;
`;

const PizzaDescription = styled.p`
	margin: 10px;
`;

const PizzaToppings = styled.p`
	margin: 10px;
	strong {
		text-decoration: underline;
		font-style: italic;
	}
`;

const PizzaPrice = styled.p`
	display: flex;
	justify-content: center;
	margin: 10px;
	strong {
		font-weight: bold;
	}
`;

const MoreInfoButton = styled(Link)`
	position: absolute;
	bottom: 10px;
	right: 10px;
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

const LoadingMessage = styled.h1`
	padding-top: 100px;
`;
