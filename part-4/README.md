# `Część 4- Wstęp do Redux(Redux toolkit)`
## Lista
1. Przekazywanie danych bez state managementu,
2. Struktura Reduxa(actions, reducers, store)
3. Zasada działania,
4. Przedstawienie redux toolkit,
5. Rozwiniecie Aplikacji z PART III i redux toolkit,
6. Asynchroniczne akcje z redux (Redux Thunk)

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
    type: INCREMENT
  }
}

// decrementAction.js
export const DECREMENT = "DECREMENT"

function decrement() {
  return {
    type: DECREMENT
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

1. Wysłany zostaje obiekt akcji do `store'a` za pomocą `dispatch`.
2. `Store` reduxa wywoływuje każdego reducera przekazanego w funkcji `createStore()`.
3. Pasująca akcja w reducerze zmanipuleje w zadany jej sposób `state store'a`.
4. Store reduxa zostanie nadpisany zmianami zwróconymi z reducera.
5. Wszystkie pobrane dane ze stora w komponentach zostają zaaktualizowane.

## 4. Przedstawienie redux toolkit,

`Redux toolkit` to nadbudówka `redux`. Jego stworzenie wynikło jako poprawa takich wad jak:
- implementacja store'a redux'owego jest zbyt skomplikowana,
- Aby redux zaczął dawać jakieś korzyści trzeba najpierw dodać wiele paczek,
- Typowy redux generuje zbyt dużo boilerplate'a,

`Redux-toolkit` zmienia nieco koncepcje redux'a. Wprowadzone został szereg funkcji ułatwiających ich implementacje.
 - `createSlice()` - funkcja tworząca slice'y. Jest dosyć wykorzystywana w naszej templatce. Generuje akcje i reducery. W prosty i czytelny sposób możemy tworzyć kolejne reducery,
- `configureStore()` - nadbudówka `createStore()`. Domyślnie zawiera `redux-thunk`, automatycznie agreguje nasze reducery,

```JavaScript
function createSlice({
    /*A name, used in action types*/
    name: string,
    /* The initial state for the reducer */
    initialState: any,
    /* An object of "case reducers". Key names will be used to generate actions.*/
    reducers: Object<string, ReducerFunction | ReducerAndPrepareObject>
    /* An additional object of "case reducers", where the keys should be other */
    /* action types, or a "builder callback" function used to add more reducers */
    extraReducers?:
    | Object<string, ReducerFunction>
    | ((builder: ActionReducerMapBuilder<State>) => void)
})
```

## 5. Rozwiniecie Aplikacji z PART III i redux toolkit,

Zadanie
1. Skopiować folder ./src z part-3 do ./part-4/src
2. Doinstalowac paczki
```
npm i typescript @types/jest @types/node @types/react @types/react-dom
```
3. Utworzyć foldery `./src/store` i `./src/reducers`, a w nim odpowiadnio pliki `store.ts` oraz counterSlice.ts i `index.ts` w `./src/reducers`

4. W store.ts dodać linijki:
```JavaScript
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from '../reducers';

const store = configureStore({ reducer: rootReducer });
export default store;
```

Na końcu pliku `./src/reducers/index.ts` dodać następująca linijke:
```JavaScript
export type RootState = ReturnType<typeof rootReducer>;
```

5. Zaimplementować `counterSlice.ts` i `index.ts`, 

6. Wykorzystać hooki `useSelector` i `useDispatch`.

## 6. Asynchroniczne akcje z redux (Redux Thunk)

Redux Thunk jest to biblioteka obsługująca asynchronicznność w `redux`. Ze wzgledu na to że redux jest tylko synchroniczny, `redux thunk` wprowadza nam tę możliwość uporządkowując akcje asynchroniczne(`Promise` i `async await`) w akcje synchroniczne.

Kreator akcji asynchronicznej:
```JavaScript
export const getQuestion = (): AppThunk => async (dispatch) => {
    // rozpoczęcie akcji w store redux'a
    dispatch(getQuestionStart());
    
    // rozpoczecie wysyłania żądania do API
    agent.Questions.getQuestion(questionId)
        // na sukces wyślij akcję o poprawnym zakonczeniu żądania,
        .then((response) => dispatch(getQuestionSuccess(response)))
        // na porażke wyślij akcję o negatywnym zakonczeniu żądania,
		.catch((error) => dispatch(getQuestionFailure(error)));
};
```

Wówczas w naszym komponencie możemy wywołać jedną funkcje `getQuestion` i wysłać ją za pomocą `dispatch`'a do store'a, a resztą zajmie się nasz redux.

```JavaScript
const App: React.FC<{}> = () => {
    
    // pobieranie disptacha
    const dispatch = useDispatch<any>();

    // pobieranie wartości ze store'a redux'a
	const question = useSelector((state: RootState) => state.questions.question);

    // wykonywanie zapytań do API tylko w useEffect !!!
    useEffect(()=> {
        dispatch(getQuestion)
    },[dispatch])
    
    return <div></div>
}
```