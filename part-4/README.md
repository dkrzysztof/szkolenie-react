# `Część 4- Wstęp do Redux(Redux toolkit)`
## Lista
1. Przekazywanie danych bez state managementu,
2. Struktura Reduxa(actions, reducers, store)
3. Zasada działania,
4. Pokazanie na reduxie starym,
5. Przedstawienie redux toolkit,
6. Rozwiniecie Aplikacji z PART III i redux toolkit,
7. Asynchroniczne akcje z redux (Redux Thunk)

## 1. Przekazywanie danych bez state managementu,

![](https://cdn-images-1.medium.com/max/1600/1*rnA953CTaUmjcG7jGice0w.png)

```jsx
import React from "react"

// Node.tsx
const Node: React.FC<{}> = () => {
	return (
		<>
			<em>Node</em>
			<div style={NodeStyle}>
				<Parent1 onClick={() => {}} />
				<Parent2 nameForChild={'Przykładowy tekst'} />
			</div>
		</>
	);
};

// Parent2.tsx
interface Parent2Props {
	onClick: (value: string) => void;
}

const Parent2: React.FC<Parent2Props> = () => {
	let text: string = '';

	return (
		<div>
			<em>Parent2</em>
			<div style={Parent2Style}>
				<Input placeholder="Wpisz tekst" onChange={() => {}} />
				<Button type="primary" onClick={() => {}}>
					Prześlij do komponentu obok
				</Button>
			</div>
		</div>
	);
};

// Parent1.tsx
interface Parent1Props {
	nameForChild: string;
}

const Parent1: React.FC<Parent1Props> = ({ nameForChild }) => {
	return (
		<div>
			<em>Parent1</em>
			<div style={Parent1Style}>
				<Child nameForChild2={nameForChild} />
			</div>
		</div>
	);
};


// Child.tsx
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

// Child2.tsx
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

```
## 2. Struktura Reduxa(actions, reducers, store)

![Cykl Redux-a](https://miro.medium.com/max/919/1*EdiFUfbTNmk_IxFDNqokqg.png)


```JavaScript
// counter.js - reducer
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
          return state + 1
    case 'DECREMENT':
      return state - 1
    default:
        return state
  }
}

// store.js - inicjalizacja store'a
import { createStore } from 'redux'
let store = createStore(counter)

// component.js - dispatch akcji
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

Kretory Akcji - Przed `redux toolkit'em` istniał sam redux. Przy jego implementacji, wygodne było wyciąganie akcji do osobnego pliku.

`Akcje` - są to przypadki w naszym reducerze, na którego id reaguje. Takim id jest domyślnie string, który poniekąd tłumaczy jego wpływ na state reducera. 

### Kreator Akcji
```JavaScript
// incrementAction.js
export const INCREMENT = "INCREMENT"

function increment() {
  return {
    type: INCREMENT,
    text
  }
}

// decrementAction.js
export const DECREMENT = "DECREMENT"

function decrement() {
  return {
    type: DECREMENT,
    text
  }
}
```
`Reducer` - odpowiada za część logiki. Otrzymuje w parametrze aktualny stan reducera oraz przychodzącą akcję. 
<strong>Jest wywoływany zaraz po dispatchu akcji</strong>

Ważne jest, aby <strong>nie manipulować state'em bezpośrednio</strong>, a używać jego kopii, np.

Należy zawsze zwrócić `state` 
```JavaScript
case SET_USER:
    return Object.assign({}, state,{data: action.payload})

// lub
case SET_USER:
    return {...state, data: action.payload}

```
Wygląd reducera z kreatorami akcji.
```JavaScript
import { INCREMENT } from "./incrementAction.js"
import { DECREMENT } from "./decrementAction.js"

function counter(state = 0, action) {
  switch (action.type) {
    
    case INCREMENT:
        return state + 1
    case DECREMENT:
        return state - 1

    default:
        return state
  }
}
```

`Store` - magazyn naszych danych. Można z niego pozyskać takie propertki jak:
- `getState()` - funkcja zwracająca dane z wszystkich reducerów,
- `dispatch()` - funkcja służąca do wysyłania akcji do konkretnych reducerów,
- `subscribe(listener)` - funkcja rejestrująca słuchaczy. Za jej pomocą można stworzyć np. logger'a do wypisywania state'a po każdej zmianie. Zwraca funkcje, która odmontowywuje słuchacze ze store'a,

## 3. Zasada działania,

1. Wysłana zostaje funkcja za pomocą `dispatch` z obiektem akcji jako argument,
2. `Store` reduxa wywoływuje każdego reducera przekazanego w funkcji `createStore()`,
3. Pasująca akcja w reducerze zmanipuleje w zadany jej sposób state store'a,
4. Store reduxa zostanie nadpisany zmianami zwróconymi z reducera.

## 4. Pokazanie na reduxie starym,
## 5. Przedstawienie redux toolkit,


## 6. Rozwiniecie Aplikacji z PART III i redux toolkit,
## 7. Asynchroniczne akcje z redux (Redux Thunk)
