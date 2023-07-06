import { Col, Row, Layout, Pagination, Modal, Button, Space} from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderAnt from "../../components/HeaderAnt/HeaderAnt";
import CarouselAnt from "../../components/CarouselAnt/CarouselAnt";
import "./home.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";
import TextShoe from "../../components/Text/TextShoe";

const Home = () => {
  const [shoe, setShoe] = useState();
  const [shoePage, setShoePage] = useState();
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/AllShoes");
        setShoe(response.data);
        setShoePage(response.data.slice(0, 6));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

    useEffect(() => {
      if(shoePage !== undefined){
        setVisible(Array(shoePage.length).fill(false));
      }
    }
  ,[shoePage]);

  const handleClickPage = (current) => {
    const startIndex = (current - 1) * 6;
    const endIndex = startIndex + 6;
    setShoePage(shoe.slice(startIndex, endIndex));
    console.log(shoe);
  };
  const handleShowModal = (index) => {
    const updatedVisible = [...visible];
    updatedVisible[index] = true;
    setVisible(updatedVisible);

    console.log(index)
  };

  const handleOk = (index) => {
    const updatedVisible = [...visible];
    updatedVisible[index] = false;
    setVisible(updatedVisible);

  };

  const handleCancel = (index) => {
    const updatedVisible = [...visible];
    updatedVisible[index] = false;
    setVisible(updatedVisible);
  };
  return (
    <div>
      <Layout>
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
                        src={"./images/" + shoePage.src + ".png"}
                      />
                      <div className="name-shoe">{shoePage.name}</div>
                      <Modal
                        visible={visible[index]}
                        onOk={() => handleOk(index)}
                        onCancel={() => handleCancel(index)}
                        maskClosable={false}
                        closable={false}
                        centered
                      >
                       <TextShoe shoe = {shoePage} type = {"show"}/>
                      </Modal>

                      <div className="price-shoe">
                        <Space align="center" >
                          <div>{shoePage.price}$</div>{" "}
                          <Button
                            type="primary"
                            size="small"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => handleShowModal(index)}
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
          
        </Content>
        <Pagination className="paging"
          defaultCurrent={1}
          total={20}
          defaultPageSize={6}
          onChange={handleClickPage}
        />
        
      </Layout>
    
    </div>
  );
};

export default Home;
