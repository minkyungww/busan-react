import axios from "axios";
import HeadLayout from "components/layouts/HeadLayout";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Main = () => {
  // QueryString
  const { search } = useLocation();
  // const querySting = useMemo(() => new URLSearchParams(search), [search]);

  const [attrs, setAttrs] = useState([]);

  const navigate = useNavigate();

  const getPageNo = useMemo( () => {
    const  querySting = new URLSearchParams(search);
    let pageNo = 1 // 기본값을 1로 설정
    if(querySting.get("pageNo") != null &&
      !isNaN(querySting.get("pageNo"))){
      pageNo = querySting.get("pageNo");} // parseInt는 숫자로 변환 메서드, 그러나 url에 있는 숫자도 모두 문자형임. 주소를 그대로 받아오는 거기 때문에 숫자로 바꿀 필요 없음
  
    return pageNo;
  
  },[search]);

  const getAttrs = () => {
    axios
    .get(`https://apis.data.go.kr/6260000/AttractionService/getAttractionKr?serviceKey=L4O6Jd5locofQV0Sa674EwMQ4GyHi380DNlzkWVMQLw8O2LvzNMvBKe1RxTj4jssgmQKPrDvinJFtSOIs9KmbA%3D%3D&pageNo=${getPageNo}&numOfRows=10&resultType=json`)
    .then( (response) => {
      console.log(response.data.getAttractionKr.item);
      setAttrs(response.data.getAttractionKr.item);
    })
    .catch( (error) => {
      console.log(error);
    })
    .finally( () =>{});
  };

  useEffect(() => {
    // console.log(querySting.get("pageNo"));
    // console.log(isNaN(querySting.get("pageNo"))); // NaN = Not a Number, 숫자가 아니면 true 반환
    getAttrs();
  }, [getPageNo]);

  return (
    <HeadLayout>
      <div>
        <div>메인페이지</div>
        <Container>
          <Row>
            <Col>
              <Button className="me-3" variant="warning" onClick={ () => navigate(`/?pageNo=${parseInt(getPageNo)-1}`)}>이전</Button>
              <Button variant="info" onClick={ () => navigate(`/?pageNo=${parseInt(getPageNo)+1}`)}>다음</Button>
            </Col>

          </Row>




          <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4"> 
          {/* 화면 크기에 따라 출력되는 항목 수 달라짐 */}
            {attrs.map((value, index) => {
              return (
              <Col key={index}>
                <Card className="mb-5" >
                    <Card.Img variant="top" src={value.MAIN_IMG_THUMB} />
                    <Card.Body>
                      <Card.Title>{value.PLACE}</Card.Title>
                      <Card.Text style={ {height : "100px", overflow: "hidden"}}>
                        {value.ITEMCNTNTS}
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                 </Card>
                </Col>
            );})}
          </Row>
        </Container>
        <button onClick={() => navigate("/counter")}>카운터로 이동</button>
      </div>
    </HeadLayout>
  );
};

export default Main;
