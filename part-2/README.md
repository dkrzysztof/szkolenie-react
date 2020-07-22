# Część druga - React wprowadzenie

## Plan szkolenia
1. Komponenty klasowe
2. State komponentu
3. Różnica pomiędzy 
Funkcyjnymi, a klasowymi komponentami,
4. LifecycleMethods w komponentach klasowych,
5. Podstawowe Hooki,
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


