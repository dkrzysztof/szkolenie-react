import React from 'react';
import './App.css';

const objects = [
	{ id: 0, name: 'Bartosz', hobby: 'Samochody' },
	{ id: 1, name: 'Juliusz Słowacki', hobby: 'Poezja i Sztuka' },
	{ id: 2, name: 'Mickiewicz Adam', hobby: 'Wnerwianie Słowackiego' }
];

function App(props) {
	const buttonOnClick = () => {
		console.log('I was Clicked');
	};

	const div = <h1>to jest div!</h1>;

	/// Zadanie wyrenderować za pomoca funkcji z Array osobno kazdy
	// element z tablicy do div - a

	// Array.map

	return (
		<div>
			<div className="App">
				<header className="App-header">
					Hello {props.name}
					<button onClick={buttonOnClick}>Kliknij mnie</button>
					{objects.map((x) => (
						<div key={x.id}>
							<h4>{x.name}</h4>
							<p>Hobby: {x.hobby}</p>
						</div>
					))}
				</header>
			</div>
			<h1>tag</h1>
		</div>
	);
}

export default App;
