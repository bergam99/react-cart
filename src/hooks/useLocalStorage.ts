import { useEffect, useState } from "react"

//  코드에서도 useLocalStorage 함수가 받는 파라미터의 타입을 제네릭으로 정의하여, 함수를 호출할 때 그 타입을 결정할 수 있습니다. T는 어떤 타입도 가능하며, 호출 시에는 key와 initialValue의 타입이 T로 결정됩니다. 이를 통해 localStorage에 저장되는 값의 타입을 정의할 수 있습니다.
// 제네릭(Generic)은 여러 종류의 데이터 타입에 대해 동작하는 함수나 클래스를 만들 때 사용하는 문법입니다. 제네릭을 사용하면 함수나 클래스에서 사용하는 데이터 타입을 함수나 클래스를 사용할 때 지정할 수 있게 됩니다.

// 예를 들어, useLocalStorage 함수는 로컬 스토리지에 값을 저장하거나 불러올 때 사용하는 함수인데, 여러 종류의 값들을 저장해야 할 때 사용할 수 있도록 제네릭을 사용합니다. 함수를 호출할 때 어떤 종류의 값이 들어올지 알 수 없기 때문에, 이 함수가 사용하는 데이터 타입을 T로 지정해둔 것입니다.

// 그리고 useState 훅을 사용하여 로컬 스토리지에 저장된 값을 가져와서 value 상태 값에 저장하고, 이 값을 변경하는 setValue 함수를 반환합니다. 이 함수를 사용하면 컴포넌트 내부에서 value를 수정할 수 있고, useEffect 훅을 사용하여 value 값이 변경될 때마다 로컬 스토리지에 저장하는 로직을 구현합니다.

// 이렇게 제네릭을 사용하면 다양한 종류의 값들에 대해 유연하게 대응할 수 있기 때문에, 리액트에서 
export function useLocalStorage<T>(key:string, initialValue:T|(()=>T)){
    const [value, setValue] = useState<T>(()=> {
        const storeItems = localStorage.getItem(key)
        if (storeItems != null) return JSON.parse(storeItems)

        if (typeof initialValue === "function") {
            return (initialValue as () => T)()
        }else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key,value])
    return [value, setValue] as [typeof value, typeof setValue]
}