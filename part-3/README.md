# Część trzecia - Wstęp do TypeScript`
1. Statyczne typy dostępne w TS,
2. Rekonfiguracja CRA na TS,
3. Budowanie komponentu w TS,
    - Interfejs, a typ,
    - Deklaracja propsów i state'a,
4. Przerobienie zadania z Part II na ts

## 1. Statyczne typy dostępne w TS

```JavaScript
number
string
boolean
object
array
any
```

## 2. Budowanie komponentu w TS,

```JavaScript
// komponent funkcyjny
const App: React.FC<{}> = () => {

    return <h1>component</h1>
}

// komponent klasowy
class Clock extends Component<ComponentProps, ComponentState> {

    render(){
        return <h1>Class Component</h1>
    }
}
```

### 2.1. Interfejs, a typ,
Różnią się paroma parametrami.

`interface` służy do implementacji obiektów.

`type` służy do implementacji różnego zmiennych, od prymitywnych aż po generyczne.

```JavaScript
interace Point {
    x: number;
    y: number;
}

type Point = {
    x:number;
    y:number;
}
```

`type` może jeszcze rozszerzać właściwości kilku `interface`'ów, podczas gdy te nie mogą.

```JavaScript
type TwoInterfaces = InterfaceA & InterfaceB;
```

### 2.2. Deklaracja propsów i state'a,

Deklaracja `props`
```JavaScript
interafce AppProps {
    name:string;
}

const App: React.FC<AppProps> = (props) => {

    return <h1>component</h1>
}
```

Deklaracja state'a

```JavaScript
interface ArrayElement {
    id:number;
    name:string;
}

interface AppState {
    name:string;
    users: ArrayElement[]
}

// klasowy komponent
class Clock extends Component<{}, AppState> {

    render(){
        return <h1>Class Component</h1>
    }
}

// useState
const [state,setState] = useState<AppState>({})

```

## 3. Rekonfiguracja CRA na TS,

### Korzystając z templatki typescript od CRA
```
npx create-react-app my-app --template typescript
```

### Przekształacając dotychczasowy projekt react

1. Dodaj do projektu poniższe dependencje
```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

2. Zainicjuj typescript w projekcie

```
npx tsc --init
```

3. Zmień rozszerzenie plików 

```
file.js -> file.ts

Component.jsx -> Component.tsx
```

w pliku `tsconfig.json` warto odkomentować poniższe linijki:
```json
    "moduleResolution": "node",
    "jsx": "react",
    "module": "esnext", 
    "allowJs": true,
```

poza `compilerOptions`, dodać propertke `include`
```json
    include: ["src"]
```

Oczywiście można skopiować wszystkie ustawienia z `npx cra --template typescript`. Jednak warto sprawdzić czy są ustawionione poniższe własciwości:
```
    "strict": false,
    "strictFunctionTypes" : false,
    "isolatedModules": true
```

4. Odpowiednio poprawić błędy w plikach, chociażby dodanie `const App:React.FC<{}> = ..` typu do komponentów funkcyjnych.

5. Zresetowanie `npm start`

## 4. Przerobienie zadania z Part II na ts

Przerobić Aplikację react z zadania 2 na Aplikację React obsługującą TypeScript.
