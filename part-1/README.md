# Część pierwsza - uruchomienie środowiska za pomocą `create-react-app`, wprowadzenie do `JavaScript`.

## 1. Plan szkolenia
1. Środowisko:
    * `Create-React-App` - aplikacja na komputerze,
    * Alternatywa: `Codepen` - emulator w przeglądarce,
    * Alternatywa: `React` oddzielnie jako `cdn` w html (nie polecane: inna składnia jsx),
4. `JavaScript` - Wprowadzenie,
5. `React` - wprowadzenie, wytłumaczenie `JSX`,
6. Ćwiczenie,

## 2. Środowisko

### 2.1. `create-react-app`

#### **WYMAGANIA**</br>

* Node.js 12.0.0^
* npm 6.0.0^

Do uruchomienia aplikacji frontendowych na swoim komputerze wymagane jest zainstalowanie [`nodejs (link)`](https://nodejs.org/en/). Wybrać wersje rekomendowaną. Choć do tworzenia frontendu nie potrzebujemy środowiska nodejs, to będziemy potrzebować menedżera pakietów `npm`, który instaluje się wraz nim. Podczas instalacji **NALEŻY** zaznaczyć instalacje npm. 

#### Przykładowy widok instalacyjny: <div style="width:fit-content;margin:auto">![widok instalacyjny](https://3wga6448744j404mpt11pbx4-wpengine.netdna-ssl.com/wp-content/uploads/2015/01/installer.png "widok")</div>

#### Sprawdzenie obecności środowisk na komputerze

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
npx create-react-app nazwa-aplikacji
```

Stworzy to folder z zainstalowanymi paczkami (w tym biblioteką react) i prostą aplikacją reactową.

```
cd nazwa-aplikacji
npm start
```


#### `npm start`

Uruchamia aplikacje webową w przeglądarce<br />
Dostępna pod domyślnym adresem [http://localhost:3000](http://localhost:3000).

Strona automatycznie się odświeży na wprowadzone zmiany.<br />
Wszytkie błędy.
