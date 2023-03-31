import React from "react";
import storeItems from "../../data/items.json";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import formatCurrency from "../../utilities/formatCurrency";
import { Button, Stack } from "react-bootstrap";
// implement all of our features, img, price, name, quantity, total price, multiple, remove...

// 쇼핑몰 웹앱에서 장바구니에 담긴 각 아이템을 보여주는 CartItem 컴포넌트입니다. 이 컴포넌트는 id와 quantity라는 두 개의 프로퍼티를 CartItemProps 타입으로 받습니다. useShoppingCart 훅을 사용하여 removeFromCart 함수를 가져와서 장바구니에서 아이템을 삭제할 수 있도록 구현했습니다.
type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  // useShoppingCart 훅을 사용하여 removeFromCart 함수를 받아옵니다. removeFromCart 함수는 장바구니에서 아이템을 삭제하는 함수입니다.
  const { removeFromCart } = useShoppingCart();
  // storeItems 배열에서 id 값으로 일치하는 아이템을 찾아서 item 변수에 할당합니다. 만약 item이 null이면 null을 반환합니다.
  // i는 storeItems 배열의 각 요소를 가리키는 변수명입니다. 이 배열은 items.json 파일에서 불러와진 것으로 예상됩니다. 각 요소는 id, name, price, imgUrl 등의 속성을 가지는 객체일 것입니다. CartItem 컴포넌트에서 id 값을 통해 해당 아이템 객체를 storeItems 배열에서 찾고, 찾을 수 없는 경우에는 null을 반환합니다.
  // i 말고 다른 것 써도 됨. 여기서 i는 단지 배열 storeItems에서 현재 반복 중인 각 항목을 나타내는 임시 변수일 뿐이므로, 다른 알파벳이나 심볼 등으로 대체해도 상관없습니다. 다만 일반적으로 프로그래머들 사이에서 널리 쓰이는 관례가 있어서, 이를 따르는 경우가 많습니다. 일반적으로 i는 반복문에서 index(인덱스)를 나타내는데 사용하고, 객체를 다루는 경우에는 item이나 obj 등이 자주 쓰입니다.
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

// &&는 JavaScript에서 논리 AND 연산자입니다. 이 연산자는 두 개의 피연산자 중 하나라도 false이면 false를 반환하고, 두 개의 피연산자가 모두 true인 경우 마지막 피연산자를 반환합니다.

// 따라서, 위 코드에서 {quantity > 1 && ...}는 quantity가 1보다 큰 경우에만 JSX 엘리먼트를 렌더링합니다. && 연산자는 앞의 피연산자가 true인 경우에만 뒤의 JSX 엘리먼트를 렌더링하기 때문에, quantity > 1이 false인 경우는 아무것도 렌더링하지 않습니다.
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
export default CartItem;
