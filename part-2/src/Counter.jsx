// rcc
import React from 'react';

class Counter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			counter: 0
		};
	}

	componentDidMount() {
		console.log('i was mounted');
	}

	componentDidUpdate() {
		console.log('i was updated');
	}

	componentWillUnmount() {
		console.log('i will unmount');
	}

	handleAddButtonClick() {
		this.setState((prevState) => {
			return {
				counter: prevState.counter + 1
			};
		});
	}

	handleSubtractButtonClick() {
		this.setState((prevState) => {
			return {
				counter: prevState.counter - 1
			};
		});
	}

	render() {
		return (
			<div>
				<p>{this.state.counter}</p>
				<div className="d-flex">
					<button onClick={this.handleAddButtonClick.bind(this)}>
						dodaj 1
					</button>
					<button onClick={this.handleSubtractButtonClick.bind(this)}>
						odejmij 1
					</button>
				</div>
			</div>
		);
	}
}

export default Counter;
