// zadanie 1

// Napisać funkcje, która wypisze zawartość tablicy w nast. sposób
// "1, 2, 3, 4 oraz 5"
// w parametrze funkcji przekazujemy tablice

// zadanie 2
// Napisać funkcje, która usunie obiekt z tablicy na podane 'id'
// tablica musi być zadeklarowana przed funkcją

let objects = [
	{ id: 0, name: 'Bartosz' },
	{ id: 1, name: 'Juliusz Słowacki' },
	{ id: 2, name: 'Mickiewicz Adam' }
];

// zadanie 3

// Napisać funkcję, która jesli wykryje że podany obiekt ma tylko jedną propertkę,
// to jej zawartość przypisze do rodzica  np.
// Wystarczy wypisać do konsoli, jesli taka zmiana moze zajsc
let obiekt = {
	data: {
		a: 1,
		b: 2,
		c: 3
	}
};

// ma zostać przekszatłocny w

obiekt = {
	a: 1,
	b: 2,
	c: 3
};

// nie ma działać jeśli obiekt bedzie wyglądał tak:

obiekt = {
	data: {
		a: 1,
		b: 2,
		c: 3
	},
	wartoscA: 2,
	wartoscB: 4,
	wartoscC: 6
	// ...
};

// Zadanie 1 napisać funckje strzałkową co wypisze do koncoli jakies słowo przywitanie
// Zadanie REACT zmapować tablice do pokazania wszystkich wartości w html

const objects = [
	{ id: 0, name: 'Bartosz', hobby: 'Samochody' },
	{ id: 1, name: 'Juliusz Słowacki', hobby: 'Poezja i Sztuka' },
	{ id: 2, name: 'Mickiewicz Adam', hobby: 'Wnerwianie Słowackiego' }
];
