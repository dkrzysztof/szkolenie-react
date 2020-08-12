import React, { useState } from 'react';
import { Parent1Style } from '../styles/styles';
import { Input, Button } from 'antd';
interface Parent1Props {
	onClick: (value: string) => void;
}

const Parent1: React.FC<Parent1Props> = ({ onClick }) => {
	let text: string = '';

	return (
		<div>
			<em>Parent1</em>
			<div style={Parent1Style}>
				<Input
					placeholder="Wpisz tekst"
					onChange={(value) => {
						text = value.target.value;
					}}
				/>
				<Button type="primary" onClick={() => onClick(text)}>
					Prześlij do komponentu obok
				</Button>
			</div>
		</div>
	);
};

export default Parent1;
