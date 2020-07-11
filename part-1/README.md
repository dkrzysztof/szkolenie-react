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

```JavaScript
function testVar() {
    for (var i = 0; i < 3; i++) {
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
### Deklaracja tablic

```JavaScript
let a = [1,2,3]
```

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
### Łączenie stringów 

```JavaScript
let wiek = 10

str = 'alicja ma ' + wiek
console.log(str)

str = "alicja ma "
console.log(str.concat(wiek))

str = `alicja ma ${wiek}`
console.log(str)
```

### Deklaracja Funkcji

```JavaScript
// funkcja anonimowa
const foo1 = function(str){
    console.log(str)
}

// wyrażenie strzałkowe
const foo2 = (str) => {
    console.log(str)
}
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
