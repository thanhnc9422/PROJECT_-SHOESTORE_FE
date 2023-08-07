import { Col, Row, Layout, Pagination, Modal, Button, Space} from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderAnt from "../../components/HeaderAnt/HeaderAnt";
import CarouselAnt from "../../components/CarouselAnt/CarouselAnt";
import "./home.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";
import TextShoe from "../../components/Text/TextShoe";
import ChatFrame from "../../components/Chat/ChatFrame";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const [shoe, setShoe] = useState();
  const [shoePage, setShoePage] = useState();
  const [total, setTotal] = useState();
  const [popup, setPopup] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/AllShoes");
        setShoe(response.data);
        setShoePage(response.data.slice(0, 6));
        setTotal(response.data.length)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);




  const handleClickPage = (current) => {
    const startIndex = (current - 1) * 6;
    const endIndex = startIndex + 6;
    setShoePage(shoe.slice(startIndex, endIndex));
    console.log(shoe);
  };


  const ShowModal = (item, visible) => {
    if (visible === false) {
      setPopup();
    } else {
      setPopup(
        <Modal
          visible={visible}
          onCancel={() => ShowModal(item, false)}
          maskClosable={true}
          closable={false}
          centered
          footer={null}
        >
          <div style={{ textAlign: "center" }}>
            <TextShoe shoe = {item} type = {"show"} funcShoe={handleAddToCart}/>
          </div>
        </Modal>
      );
    }
  };
  
  const handleAddToCart =  async (shoeId) => {
    const formData = new FormData();
    formData.append("id", shoeId);
      const response = await axios.post(
        "http://localhost:8080/cart/add/" + user.id, formData,
        { withCredentials: true }
      );
    };

  return (
    <div>
      <Layout className="layout">
        <HeaderAnt />
        <CarouselAnt />
        <Content className="site-layout">
          <div className="site-content">
            <div> Content</div>
            <div className="content-shoe">
              <Row gutter={[40, 16]}>
              {shoePage?<>{shoePage.map((shoePage, index) => (
                  <>
                  <Col xs={{span : 12}} lg={{span : 8}} >
                    <div className="item-shoe">
                      <img
                        alt=""
                        className="img-item"
                        src={shoePage.src}
                      />
                      <div className="name-shoe">{shoePage.name}</div>
            

                      <div className="price-shoe">
                        <Space align="center" >
                          <div>{shoePage.price}$</div>{" "}
                          <Button
                            type="primary"
                            size="small"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => ShowModal(shoePage, true)}
                          >
                            Buy
                          </Button>
                        </Space>
                      </div>
                    </div>
                  </Col>
                  </>
                ))}</>:<></>}
                {}
                
              </Row>
            </div>
          </div>
          <Pagination className="paging"
          defaultCurrent={1}
          total={total}
          defaultPageSize={6}
          onChange={handleClickPage}
        />
        </Content>
        <Footer style={{ textAlign: 'center', color: "white", backgroundColor: "rgb(-0, 21, 40)" }}>Ant Design ©2023 Created by Ant UED</Footer>
        {popup}
      </Layout>
    <ChatFrame/>
    </div>
  );
};

export default Home;
