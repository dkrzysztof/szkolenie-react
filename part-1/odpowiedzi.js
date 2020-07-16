// zadanie 1
function printArr(array) {
	let last = array.pop();
	let beforeLast = array.pop();
	let str = '';

	for (let i = 0; i < array.length; i++) {
		str = str.concat(array[i] + ', ');
	}

	str = str.concat(beforeLast + ' oraz ' + last);
	console.log(str);
}

// zadanie 2

function remove(id) {
	objects = objects.filter((val) => val.id !== id);
}

// zadanie 3

function parseObject(obj) {
	if (Object.keys(obj).length === 1) {
		obj = obj[Object.keys(obj)[0]];
		console.log(obj);
	}
}

// zadanie 1 - REACT
{
	objects.map((x) => (
		<div key={x.id}>
			<h4>{x.name}</h4>
			<p>Hobby: {x.hobby}</p>
		</div>
	));
}
