import React, { Component } from 'react';

const styleDiv = {
	border: '1px solid white',
	borderRadius: '0.25rem',
	padding: '0.5em 1em'
};

class Timer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			counter: 10
		};
	}

	handleAddButtonClick = (e) => {
		this.setState((prevState, props) => ({
			counter: prevState.counter + 1
		}));
	};

	handleRemoveButtonClick = (e) => {
		this.setState((prevState, props) => ({
			counter: prevState.counter - 1
		}));
	};

	render() {
		return (
			<div style={styleDiv}>
				<h4>test component</h4>
				<p>{this.state.counter}</p>
				<button onClick={this.handleAddButtonClick}>Dodaj 1</button>
				<br />
				<button onClick={this.handleRemoveButtonClick}>
					Odejmij 1
				</button>
			</div>
		);
	}
}

export default Timer;
