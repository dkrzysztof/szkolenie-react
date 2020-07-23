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
componentDidUpdate(prevProps) {
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
    // Zwróć null, aby zasygnalizować brak zmian. null => false
    return null;
  }
```

### 3.5. `shouldComponentUpdate()`
```JavaScript
shouldComponentUpdate(nextProps, nextState) {
 return this.props.title !== nextProps.title || 
  this.state.input !== nextState.input }
```

### 3.6. `getSnapshotBeforeUpdate()`
- Wywoływana zaraz przed aktualizacja DOM-u. Wartość zwracana z `getSnapshotBeforeUpdate()` jest przekazywana do `componentDidUpdate()`.
- Powinno się jej używać rzadko albo w ogóle,
- dobrym przykładem jest zmiana rozmiaru okna podczas asynchronicznych akcji,

```JavaScript
getSnapshotBeforeUpdate(prevProps, prevState) {

}
```

### 3.6. [DEPRECATED] nie używane metody. W react 16.4 lub 17 zostaną usunięte. Mają przedrostek `UNSAFE_`. Część z nich została zastąpiona `getSnapshotBeforeUpdate`

- `componentWillMount`
- `componentWillReceiveProps`
- `componentWillUpdate`

## 4. 
Za pomocą hook'ów w react(o nich w punkcie 5.) można odwzorować state oraz podstawowe


