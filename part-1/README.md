# Część pierwsza - uruchomienie środowiska za pomocą `create-react-app`, wprowadzenie do `JavaScript`.

## 1. Plan szkolenia
0. Środowisko:
    * `Create-React-App` - aplikacja na komputerze,
    * Alternatywa: `Codepen` - emulator w przeglądarce,
1. `JavaScript` - Wprowadzenie,
2. `React` - wprowadzenie, wytłumaczenie `JSX`,
3. Ćwiczenie,

## 0. Środowisko

### 0.1. `create-react-app`

#### **WYMAGANIA**</br>

* Node.js 12.0.0^
* npm 6.0.0^

Do uruchomienia aplikacji frontendowych na swoim komputerze wymagane jest zainstalowanie [`nodejs (link)`](https://nodejs.org/en/). Wybrać wersje rekomendowaną. Choć do tworzenia frontendu nie potrzebujemy środowiska nodejs, to będziemy potrzebować menedżera pakietów `npm`, który instaluje się wraz nim. Podczas instalacji **NALEŻY** zaznaczyć instalacje npm oraz `Add to PATH`. 

#### Przykładowy widok instalacyjny: <div style="width:fit-content;margin:auto">![widok instalacyjny](https://3wga6448744j404mpt11pbx4-wpengine.netdna-ssl.com/wp-content/uploads/2015/01/installer.png "widok")</div>

#### Sprawdzenie obecności środowisk na komputerze (terminal `bash` lub `cmd`)

npm:
```
npm -v
> 6.14.5
```

node.js
```
node -v
> v14.2.0
```

#### **Stworzenie prostej aplikacji reactwej** 

W folderze z naszymi przyszłymi projektami reactowymi otworzyć konsole (może być cmd, ważne aby npm był w zmiennych środowiskowych) i wywołać komende.

```
npx create-react-app part-1
```
gdzie `part-1` to nazwa folderu, w którym zostanie stworzony nasz projekt.

Stworzy to folder z zainstalowanymi paczkami (w tym biblioteką react) i prostą aplikacją reactową.

```
cd part-1
npm start
```

#### `npm start`

Uruchamia aplikacje webową w przeglądarce<br />
Dostępna pod domyślnym adresem [http://localhost:3000](http://localhost:3000).

Strona automatycznie się odświeży na wprowadzone zmiany.<br />
Wszytkie błędy będą widoczene w terminalu (tam gdzie została wywoałana komenda `npm start`).

### 0.2. `Codepen`

W prosty sposób możemy korzystać z reacta z pomocą strony [`Codepen`](https://codepen.io/aspittel/pen/gdrexE?editors=0010).


## 1. Wprowadzenie do JavaScript

### 1) Tworzenie zmiennych i stałych

```JavaScript
var let const

var zmienna = 5

let zmienna = "str"

const stala = 124
```

#### Różnica między `var` i `let`

`var` nie jest `scope`'owe, tzn. nie jest zmienna dostępną tylko w danym kontektową, a także poza nim.
```JavaScript
function testVar() {
    for (var i = 0; i < 3; i++) {
        var course = 'JavaScript';
        console.log(i);
    }

    console.log(course);
}
// 0
// 1
// 2
// JavaScript
```
`let` jest zmienna kontekstową, nie może zostać odczytana poza pętlą `for`. 
```JavaScript
function testVar() {
    for (let i = 0; i < 3; i++) {
        let course = 'JavaScript';
        console.log(i);
    }

    console.log(course);
}
// 0
// 1
// 2
// Uncaught ReferenceError: course is not defined
```
`const` działa w ten sam sposób co `let`.


Dobrą praktyką jest używać tylko i wyłącznie `const` i `let`.
### Łączenie stringów 

```JavaScript
let wiek = 10

str = 'alicja ma ' + wiek + ' lat' 
console.log(str)

str = "alicja ma "
console.log(str.concat(wiek).concat(" lat"))

str = `alicja ma ${wiek} lat`
console.log(str)
```

### Deklaracja Funkcji

W JS funkcje można przypisać do zmiennych. Mogą być też one przekazywane jako `callback` w parametrze funkcji. 

```JavaScript
// funkcja anonimowa
const foo1 = function(str){
    console.log(str)
}
```
Deklaracja powyżej tworzy nam osobny kontekst ( `this` ). Opcjonalnie możemy przypisać jej inny, wywołując na niej metode `bind(nowyKontekst)` Natomiast ta poniżej pobiera kontekst z poziomu wyżej. 
```JavaScript
// wyrażenie strzałkowe
const foo2 = (str) => {
    console.log(str)
}
```
Kiedy byśmy napisali komponent funkcyjny, a w nim zawarlibyśmy deklaracje funkcji w postaci strzałkowej, to  w jej ciele moglibyśmy odwołać się do zmiennych zadeklarowanych poza tą funkcją

Przykład

W ES5 wymagane było słowo `bind`, aby powiązać kontekst funkcji z kontekstem obiektu. W tamtej wersji JS nie było wyrażeń strzałkowych. Bez bindowania, `console.log` zwróciłby `undefined`.

```JavaScript
var obj = {
  id: 42,
  counter: function counter() {
    setTimeout(function() {
      console.log(this.id);
    }.bind(this), 1000);
  }
};
```
Ta sama funkcja zapisana z pomocą wyrażeń strzałkowych.
```JavaScript
var obj = {
  id: 42,
  counter: function counter(){
    setTimeout(() =>{
      console.log(this.id);
    }, 1000);
  }
};
```

Więcej na temat funkcji i kiedy należy wykorzystywać wyrażenia strzałkowe => [freeCodeCamp](https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/)

### Deklaracja tablic

```JavaScript
let a = [1,2,3]

// operacje na tablicach

a.push(4)
// [1,2,3,4]

a.pop()
// [1,2,3]
```

JavaScript dostarcza szereg metod możliwych do wykonania na tablicach. Jako parametr podaje się callback(czyli funkcja jako parametr lub jak `C#` wyrażenie lambda). Najczęściej korzysta się z poniższych.

```JavaScript

// forEach
// Array.prototype.forEach( (element, index, array) => {} )
a.forEach((element, index, array) => { console.log(array[index])} )
a.forEach((element, index) => console.log(element))
a.forEach( element => console.log(element))
for (let i = 0; i < a.length; i++) {
    console.log(a[i]);
}

// map
// zwraca nową tablice!
// Array.prototype.map( (element, index, array) => {} )
let newArray = a.map(val => val*2)
newArray = a.map(val => {return val*2})
console.log(newArray)

// slice
// zwraca nową tablice!
// Array.prototype.slice( startWithIndex, endBeforeIndex)
newArray = a.slice(1,2) // [2]
newArray = a.slice(1,3) // [2,3]
newArray = a.slice(-1)  // [3]  przedostatni
newArray = a.slice(-2)  // [2, 3]  przedostatni

// filter
// zwraca nową tablice!
// Array.prototype.filter( (element, index, array) => {} )
newArray = a.filter(element => element % 2 === 0)

```

Dokumentacja tablic => [Mozilla developer](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array)

### Deklaracja obiektów

```JavaScript
let a = {
    param1: 123,
    "param2": 120,
    foo: function(){
        console.log("Im working")
    } 
}
```

### Pobieranie własności obiektów

```JavaScript
console.log(a["param1"])
console.log(a.param2)
```


### Deklaracja tablic

```JavaScript
```
### Deklaracja tablic

```JavaScript
```

```JavaScript
```

```JavaScript
```


## 2. Wprowadzenie do React

## 3. Ćwiczenie
