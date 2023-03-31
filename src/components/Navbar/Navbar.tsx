import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useShoppingCart } from "../../context/ShoppingCartContext";
export function Navbar() {

  // useShoppingCart 함수는 ShoppingCartContext 라는 컨텍스트를 사용하고 있습니다. useShoppingCart 함수를 호출하면, ShoppingCartContext 컨텍스트의 값을 반환합니다. 이 값은 객체이며, 여기서 openCart와 cartQuantity는 이 객체의 속성(property)입니다. 이렇게 useShoppingCart 함수를 통해 ShoppingCartContext의 값을 가져와서 사용할 수 있습니다.
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3 navbar-expand-md navbar-fixed-top navbar-expand-md"   >
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        {/* && 연산자는 좌변이 true일 때에만 우변을 실행하는 연산자입니다. 즉, 여기서 cartQuantity > 0이 참일 경우에만 우변의 내용이 실행됩니다. cartQuantity > 0이 거짓일 경우에는 아무런 내용이 실행되지 않습니다. 이렇게 함으로써, 장바구니에 상품이 없을 때는 장바구니 버튼이 화면에 나타나지 않도록 하는 것이 가능합니다. */}
        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
          >
            <AiOutlineShoppingCart />
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  );
}
