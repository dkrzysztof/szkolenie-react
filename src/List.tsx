import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Card } from 'antd';
import { Store } from 'antd/lib/form/interface';

import FormAddItem from './components/FormAddItem';
import { RootState } from 'reducers';
import { removeItem, addItem, ListElement } from 'reducers/listSlice';

const List: React.FC<{}> = () => {
	const handleSubmit = (values: Store) => {
		dispatch(addItem(values.text));
	};

	const list: ListElement[] = useSelector<ListElement[]>(
		(state: RootState) => state.lists.data
	);
	const dispatch = useDispatch<any>();

	return (
		<div>
			<FormAddItem onFinish={handleSubmit} />
			{list.map((x) => (
				<Card key={x.key} className="card">
					<p>{x.text}</p>
					<Button
						onClick={() => {
							dispatch(removeItem(x.key));
						}}
						type="text"
					>
						X
					</Button>
				</Card>
			))}
		</div>
	);
};

export default List;
