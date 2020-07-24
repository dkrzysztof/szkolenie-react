# Część druga - React wprowadzenie

## Plan szkolenia
1. Komponenty klasowe
2. State komponentu
3. LifecycleMethods w komponentach klasowych,
4. Podstawowe Hooki,
5. Różnica pomiędzy 
Funkcyjnymi, a klasowymi komponentami,
6. Wykorzystanie Ant.Design
7. Ćwiczenie

## 1. Komponenty klasowe

```JavaScript
class Welcome extends React.Component {
  render() {
    return <h1>Cześć, {this.props.name}</h1>;
  }
}
```

## 2. State Komponentu klasowego
inicjalizacja state'u
```JavaScript
class Welcome extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            counter: 0
        }
    }
  render() {
    return <h1>Cześć, {this.props.name}</h1>;
  }
}
```

zmiana state'u
```JavaScript
onClick = () => {
    this.setState({
        counter: 5
    })

    // lub odwołanie do obecnego state'u lub/i propsów

    this.setState((prevState,props) => {
        return {
            counter: prevState.counter + 1
        }
    })

}
```

Czytanie propsów
```JavaScript
class Welcome extends React.Component {
  constructor(props){
      super(props)
  }

  render() {
    return <h1>Cześć, {this.props.name}</h1>;
  }
}
```

## 3. Lifecycle Methods w CC

![lifecycle diagram](https://i0.wp.com/programmingwithmosh.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-31-at-1.44.28-PM.png)

### Trójpodział władzy :D 

1. Mounting - montowanie
2. Updating - aktualizacja
3. Unmounting - odmontowywanie komponentu

### 3.1 `componentDidMount`
- Wykonywanie zapytań do api w tym miejscu,
- Dozwolone używanie `setState`,
```JavaScript
componentDidMount(prevProps) {
  agent.users.getUsers()
    .then(response => console.log(response))
    .catch(err => console.log(err))
}
```
### 3.2 `componentDidUpdate`
- wolno uzywać `setState` pod paroma warunkami. Jesli ich nie sprecyzujemy to nasz komponent może sie rerenderować w nieskończoność,
- odpowiednik hooka `useEffect` w FC,  

```JavaScript
componentDidUpdate(prevProps,prevState,snapshot) {
 // Standardowe wykorzystanie, porównanie czy wartość props się zmieniła
 if (this.props.userName !== prevProps.userName) {
   this.fetchData(this.props.userName);
 }
}
```

### 3.3. `componentWillUnmout`
- usuwanie handlerów,
- nie wolno wykonywać `setState` - i tak sie nie wyrenderuje bo obiekt zostanie odmontowany,
```JavaScript
componentWillUnmount() {
  clearInterval(this.timerID);
}
```

### 3.4. `static getDerivedStateFromProps`
- state komponentu jest zalezny od propsów,
- uzywamy w sytuacji, gdy chcemy aby nasz state był zsynchronizowany ze zmianami propsów,

```JavaScript
static getDerivedStateFromProps(props, state) {
    if (props.newSelectedUser !== state.selectedUser) {
      return {
        selectedUser: newSelectedUser
      };
    }
    // Zwróć null, aby zasygnalizować brak zmian
    return null;
  }
```

### 3.5. `shouldComponentUpdate`
```JavaScript
shouldComponentUpdate(nextProps, nextState) {
 return this.props.title !== nextProps.title || 
  this.state.input !== nextState.input }
```

### 3.6. `getSnapshotBeforeUpdate`
- Wywoływana zaraz przed aktualizacja DOM-u. Wartość zwracana z `getSnapshotBeforeUpdate()` jest przekazywana do `componentDidUpdate()`.
- Powinno się jej używać rzadko albo w ogóle,
- dobrym przykładem jest zmiana rozmiaru okna podczas asynchronicznych akcji,

```JavaScript
getSnapshotBeforeUpdate(prevProps, prevState) {

}
```

### 3.7. [DEPRECATED] nie używane metody. W react 16.4 lub 17 zostaną usunięte. Mają przedrostek `UNSAFE_`. Część z nich została zastąpiona `getSnapshotBeforeUpdate`

- `componentWillMount`
- `componentWillReceiveProps`
- `componentWillUpdate`

## 4. Podstawowe Hooki w React
Za pomocą hook'ów w react można odwzorować state oraz podstawowe metody cyklu życia komponentu.

Dwa z nich najczęściej używane:
- useEffect - odzwierciedlenie `componentDidMount`, `componentDidUpdate` oraz `componentWillUnmount`,
- useState - odzwierciedlenie state'u

```JavaScript
	useEffect(() => {
		// wykonaj te funkcje gdy zmieni się wartośc zmiennej w tablicy
		return () => {
			// na odmontowanie komponentu wykonaj te funkcje
		}
	}, [obserwujTeZmienne, i, teWSumieTeż])
```

```JavaScript
const [variable, setVariable] = useState(0)
```

## 5. Różnice między CC a FC

Podstawowa różnica polega na składni. W komponentach funkcyjnych jest przejrzysta i zawierająca mniej kodu. Wygnodniej się ją testuje i szybciej implementuje.

Sami twórcy Reacta polecają używanie funkcjonalnych komponentów zamiast klasowych. Natomiast w sytuacjach, gdy zajdzie potrzeba użycia takich LCM jak `getSnapshotBeforeUpdate`, `getDerivedStateFromProps`, `shouldComponentUpdate` to wówczas musimy skorzystać z klasowych komponentów.

## 6. Czas na Ant Design

link do strony [ant.design](https://ant.design)

```
npm install antd
// lub
npm i antd
```

w `index.js` należy zaimportować jednorazowo plik css

```JavaScript
import 'antd/dist/antd.css';
```

## 7. Ćwiczenie



