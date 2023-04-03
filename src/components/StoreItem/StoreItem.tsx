import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import formatCurrency from "../../utilities/formatCurrency";

// StoreItem 컴포넌트를 정의하는 코드입니다. Store 컴포넌트에서 storeItems 배열을 map 함수로 순회하며 StoreItem 컴포넌트를 렌더링할 때, 각 객체의 id, name, price, imgUrl 프로퍼티를 StoreItem 컴포넌트에 props로 전달합니다.

// StoreItem 컴포넌트에서는 useShoppingCart 훅을 사용하여 쇼핑카트 관련 기능을 구현하고, props로 전달받은 id, name, price, imgUrl 프로퍼티를 사용하여 카드 형식으로 제품을 렌더링합니다.

// 제품이 카트에 담겨있지 않은 경우 "Add To Cart" 버튼이 표시되고, 클릭하면 increaseCartQuantity 함수가 호출되어 해당 제품을 카트에 추가합니다. 제품이 이미 카트에 담겨있는 경우, 수량과 함께 "-"와 "+" 버튼이 표시되어 수량을 조절할 수 있고, "Remove" 버튼을 클릭하면 removeFromCart 함수가 호출되어 해당 제품을 카트에서 삭제합니다.
type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

// StoreItem 컴포넌트는 Store 컴포넌트 내부에서 storeItems.map으로 반복문을 돌며, storeItems 배열의 각 요소 객체에서 id, name, price, imgUrl 프로퍼티를 추출하여 StoreItemProps 인터페이스와 일치시켜 props로 전달합니다. 따라서 props는 storeItems 배열의 요소 객체의 프로퍼티와 일치합니다.
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={import.meta.env.BASE_URL+imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
export default StoreItem;
