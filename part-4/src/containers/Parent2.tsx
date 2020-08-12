import React from 'react';
import Child from './Child';
import { Parent2Style } from '../styles/styles';

interface Parent2Props {
	nameForChild: string;
}

const Parent2: React.FC<Parent2Props> = ({ nameForChild }) => {
	return (
		<div>
			<em>Parent2</em>
			<div style={Parent2Style}>
				<Child nameForChild2={nameForChild} />
			</div>
		</div>
	);
};

export default Parent2;
