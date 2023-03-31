import { Col, Row } from "react-bootstrap";
import StoreItem from "../../components/StoreItem/StoreItem";
import storeItems from "../../data/items.json";

const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">

        {/* StoreItem 컴포넌트는 Store 컴포넌트 내부에서 storeItems.map으로 반복문을 돌며, storeItems 배열의 각 요소 객체에서 id, name, price, imgUrl 프로퍼티를 추출하여 StoreItemProps 인터페이스와 일치시켜 props로 전달합니다 */}
        {/* storeItems 배열의 요소들을 순회하면서, 각 요소를 StoreItem 컴포넌트에 props로 전달하고 렌더링하는 부분입니다.

storeItems.map() 메서드는 배열의 각 요소를 순회하면서 새로운 배열을 반환하는 메서드이며, 이를 이용해서 StoreItem 컴포넌트를 여러 개 생성하고 렌더링합니다.

...item 구문은 객체 전개 연산자를 사용한 것으로, item 객체의 모든 속성을 StoreItem 컴포넌트에 전달하는 역할을 합니다. 따라서 StoreItem 컴포넌트에서는 이러한 속성들을 props 객체로 받아서 사용할 수 있습니다. */}
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

// StoreItem gonna take item for properties. (name, id, price...)

export default Store;
