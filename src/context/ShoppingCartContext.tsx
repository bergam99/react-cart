import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

// 이 인터페이스는 children이라는 프로퍼티를 가지며, 이 프로퍼티는 ReactNode 타입으로 정의됩니다. ReactNode는 React에서 사용되는 모든 유형의 노드를 포함하는 타입입니다.
// 따라서, ShoppingCartProviderProps는 children 프로퍼티를 반드시 가져야 하는 객체 형태를 정의하며, 이 객체는 React 컴포넌트에 전달될 수 있습니다. 이 컴포넌트는 children 프로퍼티를 이용하여 자식 컴포넌트를 렌더링할 수 있습니다.
// ShoppingCartProviderProps는 TypeScript에서 정의된 인터페이스로써, children이라는 프로퍼티를 반드시 가져야 하는 객체 형태를 정의합니다. 이는 해당 인터페이스를 구현하는 객체에서 children이 빠지면 TypeScript가 컴파일 단계에서 오류를 발생시킵니다.
type ShoppingCartProviderProps = {
  children: ReactNode;
};

// 여기 있는 게 value 안으로 감.
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

// createContext() 함수를 사용하여 ShoppingCartContext 라는 새로운 컨텍스트를 만듭니다.
// createContext() 함수는 파라미터로 기본값을 받습니다. 이 코드에서는 빈 객체({})를 기본값으로 사용하고 있습니다. 그러나 이 빈 객체는 실제로 ShoppingCartContext 타입이 아니기 때문에 TypeScript가 타입 에러를 발생시킬 것입니다.
// 따라서 {} 객체를 ShoppingCartContext 타입으로 캐스팅하기 위해 as 연산자를 사용하여 {} as ShoppingCartContext와 같은 형태로 표현하고 있습니다. 이를 통해 TypeScript가 해당 객체를 ShoppingCartContext 타입으로 인식하고 타입 검사를 수행할 수 있도록 합니다.
// 이렇게 생성된 ShoppingCartContext는 useContext()를 사용하여 해당 컨텍스트를 구독하는 컴포넌트에서 값을 읽거나 업데이트할 수 있습니다. 이를 통해 전역적으로 상태를 관리하고 컴포넌트 간에 데이터를 공유할 수 있습니다. / as + type
const ShoppingCartContext = createContext({} as ShoppingCartContext);

// useShoppingCart() 함수는 useContext() 훅을 사용하여 ShoppingCartContext를 구독하고, 해당 컨텍스트의 값을 반환합니다. 이를 통해 전역적으로 관리되는 ShoppingCart의 값을 해당 컴포넌트에서 바로 사용할 수 있습니다.
// 따라서, 이 함수는 ShoppingCartContext에서 관리되는 전역적인 ShoppingCart 상태를 컴포넌트에서 쉽게 접근하고 업데이트할 수 있도록 도와줍니다. useShoppingCart() 함수를 사용하여 ShoppingCart의 값을 가져오면, 해당 값을 변경하거나 업데이트할 때 ShoppingCartContext를 직접 사용할 필요가 없어서 코드의 가독성이 좋아집니다.
// store all of our cart information
// "구독(subscribe)"이란 컨텍스트에서 값을 가져오기 위해 해당 컨텍스트를 구독하는 것을 말합니다. useShoppingCart() 함수에서는 useContext()를 사용하여 ShoppingCartContext를 구독하여 해당 컨텍스트에서 관리되는 전역적인 ShoppingCart 상태를 가져오고, 이를 해당 컴포넌트에서 사용할 수 있도록 반환합니다.
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

// children은 React의 Props 중 하나로, ShoppingCartProvider 컴포넌트가 렌더링될 때 그 안에 포함되는 자식 컴포넌트들을 의미합니다.따라서 ShoppingCartProvider 컴포넌트에서 children을 받아오는 것은, ShoppingCartProvider 컴포넌트가 감싸고 있는 자식 컴포넌트들이 ShoppingCartContext를 사용할 수 있도록 하기 위함입니다.
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  // useState -> useLocalStorage
  // 여기에서 useLocalStorage hook은 웹 브라우저의 로컬 스토리지에 "shopping-cart"라는 키로 저장된 값을 가져오려고 시도합니다. 만약 해당 키로 저장된 값이 없다면, 빈 배열 []을 초기값으로 사용합니다. 그래서 만약 이전에 장바구니에 물건을 추가하지 않았다면 빈 배열이 초기값으로 사용됩니다. 이 배열은 장바구니의 아이템들을 저장하기 위한 배열로 사용됩니다.
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // .reduce() 메소드는 배열의 모든 요소를 하나의 값으로 줄이는(reduce) 역할을 합니다.
  //  코드에서 cartItems.reduce() 메서드는 cartItems 배열의 각 요소의 quantity 값을 모두 더한 뒤에 cartQuantity 변수에 할당합니다. 이를 통해 현재 장바구니에 담긴 총 아이템 수를 계산할 수 있습니다. reduce() 메서드는 배열을 순회하면서 quantity 값을 누적시키기 때문에 반복문을 사용하지 않아도 되며, 간단하고 효율적인 방법으로 배열의 값을 합산할 수 있습니다.
  // .reduce() 메소드는 cartItems 배열에 있는 모든 요소의 quantity 값을 합산하여 총 개수를 계산하는 역할을 합니다. reduce() 메소드의 첫 번째 인자로 전달된 콜백 함수에서는 누산기(quantity)와 현재 요소(item)의 quantity 값을 더하여 누산기에 할당하고, 초기값으로 0을 설정했습니다. 따라서 cartQuantity 변수는 cartItems 배열에 있는 모든 요소의 quantity 값을 합산한 결과가 됩니다.
  // cartItems 는 quantity, id 를 갖고 있다.
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  //   FUNCTIONS
  // 장바구니에서 해당 아이템의 수량을 가져오는 함수입니다.
  // 장바구니에 담긴 아이템들이 cartItems 배열에 저장되어 있으며, getItemQuantity 함수는 id 매개변수로 받은 아이템의 수량을 찾아 반환합니다.
  // 장바구니에 담긴 아이템들이 cartItems 배열에 저장되어 있으며, getItemQuantity 함수는 id 매개변수로 받은 아이템의 수량을 찾아 반환합니다.
  // 먼저 cartItems 배열에서 find 메서드를 사용하여 해당 아이템을 찾습니다. find 메서드는 주어진 조건을 만족하는 첫 번째 요소를 반환합니다. 여기서는 item.id === id 조건으로 해당 아이템을 찾습니다.
  // 그 다음에는 옵셔널 체이닝(?.)을 사용하여 찾은 아이템의 quantity 속성을 반환합니다. ?. 연산자는 해당 객체나 속성이 존재하면 그 값을 반환하고, 그렇지 않으면 undefined를 반환합니다. 만약 quantity 속성이 undefined이면 0을 반환합니다.
  // 즉, getItemQuantity 함수는 장바구니에 해당 아이템이 없을 경우 0을, 있다면 해당 아이템의 수량을 반환합니다.
  function getItemQuantity(id: number) {
    // console.log('card items', cartItems)
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  // 이 함수는 장바구니에 상품을 추가하는 역할을 합니다. id 매개변수로 추가하려는 상품의 ID를 전달받습니다.
// setCartItems 함수는 useState를 이용하여 상태값을 변경하는 함수로, useState로 정의된 cartItems 배열의 값을 변경하는 역할을 합니다. 
// const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
  // 이 함수의 매개변수는 id입니다. 이 함수는 장바구니에서 id에 해당하는 상품의 수량을 증가시키는 역할을 합니다.
  // currItems는 setCartItems를 호출할 때 인자로 전달된 함수에서 파라미터로 받은 변수입니다.

// setCartItems는 현재 cartItems 값을 업데이트하기 위해 사용됩니다. setCartItems는 새로운 값을 받아 해당 값을 cartItems에 업데이트하는 함수입니다.
// 파라미터로 전달된 함수는 이전 cartItems 값을 받아서 새로운 값을 계산하고, 이를 setCartItems에 전달합니다. 그리고 setCartItems는 이 값을 cartItems에 반영합니다.
// 따라서, currItems는 현재 cartItems의 상태를 가지고 있는 변수입니다. 함수 내에서 이전 cartItems 상태를 변경하지 않기 때문에 currItems는 이전 cartItems와 동일한 값을 가집니다.
  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
  // 먼저 currItems.find((item) => item.id === id) == null를 이용하여 현재 장바구니에 추가하려는 상품이 이미 있는지 검사합니다. 만약 현재 장바구니에 추가하려는 상품이 없다면, 새로운 객체 { id, quantity: 1 }를 추가하여 상품을 장바구니에 넣습니다.
        if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        // 이미 장바구니에 추가된 상품이 있다면, currItems.map을 이용하여 각 상품을 확인하고, 현재 상품 ID와 추가하려는 상품 ID가 같다면, 수량을 1 증가시킵니다.
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            // 그리고 변경된 cartItems 배열을 반환하여 상태값을 업데이트합니다. 이렇게 함으로써, 장바구니에 이미 있는 상품일 경우 수량만 늘리고, 없는 경우에는 새로운 객체를 추가하여 장바구니에 상품을 추가할 수 있습니다.
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
