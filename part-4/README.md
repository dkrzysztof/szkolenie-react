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

```JavaScript
import React from "react"

// Parent.tsx
const Parent: React.FC<{}> = () => {

    let name:string = ""

    const handleInput = () => {

    }

    return (<>
        <Child1/>
        <Child2 nameForChild3={name}/>
    </>)
}

// Child1.tsx
const Child1: React.FC<{}> = () => {
    const handleInput = (e) => {

    }
    return (<>
        <input onInput={}/>
    </>)
}

// Child2.tsx
interface Child2Props {
    nameForChild3:string;
}

const Child2: React.FC<Child2Props> = ({nameForChild3}) => {
    return (<>
        <Child3 name={nameForChild3}/>
    </>)
}

// Child3.tsx
interface Child3Props {
    name: string;
}

const Child3: React.FC<Child3Props> = ({name}) => {
    return (<>
        {name}
    </>)
}

```

## 2. Struktura Reduxa(actions, reducers, store)
## 3. Zasada działania,
## 4. Pokazanie na reduxie starym,
## 5. Przedstawienie redux toolkit,
## 6. Rozwiniecie Aplikacji z PART III i redux toolkit,
## 7. Asynchroniczne akcje z redux (Redux Thunk)
