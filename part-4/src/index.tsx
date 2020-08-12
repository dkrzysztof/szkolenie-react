import React from 'react';
import ReactDOM from 'react-dom';
import Node from './Node';
import { RootStyle } from './styles/styles';
import 'antd/dist/antd.css';

ReactDOM.render(
	<div style={RootStyle}>
		<Node />
	</div>,
	document.getElementById('root')
);
