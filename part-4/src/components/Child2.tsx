import React from 'react';
import { Child2Style } from '../styles/styles';

interface Child2Props {
	name: string;
}

const Child2: React.FC<Child2Props> = ({ name }) => {
	return (
		<div>
			<em>Child2</em>
			<div style={Child2Style}>Name: {name}</div>
		</div>
	);
};

export default Child2;
