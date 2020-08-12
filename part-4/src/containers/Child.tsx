import React from 'react';
import Child2 from '../components/Child2';
import { ChildStyle } from '../styles/styles';

interface ChildProps {
	nameForChild2: string;
}

const Child: React.FC<ChildProps> = ({ nameForChild2 }) => {
	return (
		<div>
			<em>Child</em>
			<div style={ChildStyle}>
				<Child2 name={nameForChild2} />
			</div>
		</div>
	);
};

export default Child;
