import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import formatCurrency from "../../utilities/formatCurrency";
import CartItem from "../CartItem/CartItem";
// items.json 파일에서 불러온 데이터를 storeItems 변수에 할당하는 코드가 있어서 storeItems 변수가 만들어집니다. 데이터를 fetch 함수 등을 사용하여 불러오고, 그 결과를 JSON.parse 함수를 사용하여 객체 배열로 변환한 뒤에 storeItems 변수에 할당하는 코드가 있으면, storeItems 변수가 items.json 파일에 있는 상품 정보를 담고 있게 됩니다.
import storeItems from "../../data/items.json";

// isOpen이라는 프롭스(prop)를 받아서 해당 오프캔버스를 열거나 닫습니다. 이 값은 쇼핑카트가 열려있는지 여부를 나타냅니다.
type ShoppingCartProps = {
  isOpen: boolean;
};

// 이 컴포넌트는 useShoppingCart hook을 사용하여 현재 쇼핑카트에 담긴 아이템 정보를 가져와 렌더링합니다.
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  // useShoppingCart 훅을 이용하여 cartItems와 closeCart 함수를 가져옵니다.
  // cartItems를 이용하여 장바구니에 담긴 상품들을 화면에 표시합니다.
  // 컴포넌트 내부에서는 useShoppingCart hook으로부터 closeCart와 cartItems 값을 가져와 사용합니다. cartItems 값은 배열이며, 배열의 각 요소는 현재 쇼핑카트에 담긴 아이템 정보를 담고 있습니다.
  const { closeCart, cartItems } = useShoppingCart();

  // Offcanvas 컴포넌트의 show 프로퍼티는 사이드바가 열릴지 여부를 결정합니다. onHide 프로퍼티는 사용자가 사이드바를 닫을 때 실행될 함수를 지정합니다. onHide 함수는 React에 내장된 함수가 아니며, react-bootstrap 패키지의 Offcanvas 컴포넌트에서 제공되는 props 중 하나입니다. Offcanvas 컴포넌트는 부트스트랩(offcanvas) 스타일을 사용하여 화면에서 오프캔버스(숨겨진 사이드바 또는 패널)를 구현할 수 있도록 도와줍니다. onHide 함수는 오프캔버스가 닫힐 때 호출되는 함수입니다.
  //장바구니에 담긴 각각의 상품에 대해서는 CartItem 컴포넌트를 이용하여 표시하고, 총 가격에 대해서는 reduce 함수를 이용하여 계산합니다. 계산된 총 가격은 formatCurrency 함수를 이용하여 화면에 표시합니다.
  //storeItems는 장바구니에 있는 아이템의 가격 정보를 담고 있는 배열입니다. cartItems는 장바구니에 담겨있는 아이템의 목록을 담고 있는 배열입니다. reduce() 메서드를 이용해서 cartItems 배열에 있는 각각의 아이템들에 대해서 가격을 계산합니다. reduce() 메서드에서 total 매개변수는 현재까지 계산된 가격의 총합을, cartItem 매개변수는 현재 계산 중인 장바구니 아이템을 나타냅니다. find() 메서드를 이용해서 현재 계산 중인 장바구니 아이템의 가격 정보를 storeItems 배열에서 찾아옵니다. 만약 해당하는 아이템이 없으면 undefined를 반환합니다. item?.price || 0 표현식은 item 객체가 존재하면 해당 객체의 price 속성 값을, 그렇지 않으면 0을 반환합니다. 각 아이템의 가격과 수량을 곱한 값을 total에 더해줍니다. reduce() 메서드가 반환한 총합값을 formatCurrency() 함수를 이용해 화폐 단위로 변환한 뒤 화면에 표시합니다.
  //cartItems 배열의 각 요소는 CartItem 컴포넌트로 전달되며, 이 컴포넌트는 ...item 문법을 사용하여 각 아이템의 정보를 props로 전달받습니다.
  //cartItems 배열의 가격 정보를 합산하여 총 가격을 계산한 뒤, formatCurrency 함수를 사용하여 화폐 단위 형태로 포맷팅한 값을 화면에 출력합니다.
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
