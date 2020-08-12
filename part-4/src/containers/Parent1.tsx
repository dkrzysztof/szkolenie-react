import React from 'react';
import Child from './Child';
import { Parent1Style } from '../styles/styles';

interface Parent2Props {
	nameForChild: string;
}

const Parent1: React.FC<Parent2Props> = ({ nameForChild }) => {
	return (
		<div>
			<em>Parent1</em>
			<div style={Parent1Style}>
				<Child nameForChild2={nameForChild} />
			</div>
		</div>
	);
};

export default Parent1;
