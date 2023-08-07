import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Divider,
  List,
  Avatar,
  message,
  Space,
  Radio,
  Select,
  Input,
} from "antd";
import { DeleteOutlined, DropboxOutlined, PlusOutlined } from "@ant-design/icons";
import "./CartComponent.scss";
const CartComponent = ({ removeFromCart, item }) => {

  const [messageApi, contextHolder] = message.useMessage();
  const [totalShoe, setTotalShoe] = useState();
  const [valueDlv, setValueDlv] = useState(0);
  const [valueSv, setValueSv] = useState(0);

  useEffect(()=>{
   const totalMoney = () => {
    let i = 0;
    if(item !== undefined){
     
    item.forEach(element => {
      i += parseInt(element.price);
    });
    
    valueDlv === "FREE" ? i+= (parseInt(valueSv))  : i+= (parseInt(valueDlv)+parseInt(valueSv)) 

    console.log(i)
    setTotalShoe(i);
   }
  }
   totalMoney();
  },[item,valueDlv,valueSv])

  //* ==================================== CAlCULATE & DATA ======================================
  const dataPayment = [
    {
      price: totalShoe,
      title: "items total price",
    },
    {
      price: valueSv,
      title: "additional service",
    },
    {
      price: valueDlv,
      title: "shipping fees",
    },
    {
      price: totalShoe,
      title: "TOTAL PRICE",
    },
  ];
  const addition = [
    {
      price: "10",
      title: "Package",
      description: "packed in a box",
    },
    {
      price: "2",
      title: "Environment Friendly",
      description: "wrapped in paper",
    },
    {
      price: "20",
      title: "Golden Guard",
      description: "15 days more for return",
    },
    {
      price: "50",
      title: "shoe sole stickers",
      description: "provide premium protection for your Heels",
    },
  ];
  const delivery = [
    {
      price: "FREE",
      title: "Standard Delivery",
    },
    {
      price: "5",
      title: "Next Day Delivery",
    },
    {
      price: "8",
      title: "Same Day",
    },
  ];
  //* ==================================== onChange ======================================

  const onChangeDlv = (e) => {
    console.log("delivery checked", e.target.value);
    setValueDlv(e.target.value);
  };

  const onChangeSv = (e) => {
    console.log("Service checked", e.target.value);
    setValueSv(e.target.value);
  };

  //* =========================== DELETE SHOES FROM CART ==================================
  const deleteForCart = (id) => {
    messageApi.open({
      key: "loadingCart",
      type: "loading",
      content: "Loading...",
    });
    removeFromCart(id);
    // SetIsDele(true)
  };

  return (
    <div className="cart-layout">
      {contextHolder}

      <Row gutter={[8, 8]}>
        <Col span={16}>
          <Divider orientation="left">YOUR CART</Divider>
          <List
            className="list-shoes"
            itemLayout="horizontal"
            dataSource={item}
            renderItem={(item, index) => (
              //  {const urlFb = await getUrlImg(item.src);}
              <List.Item
                actions={[
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => deleteForCart(item.id)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.src} size="large" />}
                  title={<div>{item.name}</div>}
                  description={<div>{item.price} $</div>}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={8}>
          <Divider orientation="left">SUMMARY</Divider>
        
          <List
            className="list-shoes"
            itemLayout="horizontal"
            dataSource={item}
            renderItem={(item, index) => (
              //  {const urlFb = await getUrlImg(item.src);}
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.src} size="small" />}
                  title={<div>{item.name}</div>}
                />
                <div>{item.price} $</div>
                {/* {setTotalShoe(parseInt(totalShoe)+parseInt(item.price))} */}
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Divider orientation="left">DELIVERY</Divider>
          <List
            className="payment-shoes"
            itemLayout="horizontal"
            dataSource={delivery}
            renderItem={(item, index) => (
              //  {const urlFb = await getUrlImg(item.src);}
              <List.Item
                actions={[
                  <Radio.Group
                    onChange={(event) => onChangeDlv(event)}
                    value={valueDlv}
                  >
                    <Radio value={item.price}></Radio>{" "}
                  </Radio.Group>,
                ]}
              >
                <List.Item.Meta title={<div>{item.title}</div>} />
                <div>{item.price ==="FREE"? <>{item.price}</>:<>{item.price} $</>}</div>
                <div>{item.description}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col span={8}>
          <Divider orientation="left">ADDITIONAL SERVICE</Divider>

          <List
            className="payment-shoes"
            itemLayout="horizontal"
            dataSource={addition}
            renderItem={(item, index) => (
              //  {const urlFb = await getUrlImg(item.src);}
              <List.Item
                actions={[
                  <Radio.Group
                    onChange={(event) => onChangeSv(event)}
                    value={valueSv}
                  >
                    <Radio value={item.price}></Radio>{" "}
                  </Radio.Group>,
                ]}
              >
                <List.Item.Meta title={<div>{item.title}</div>} />
                <div>{item.price} $</div>
              </List.Item>
            )}
          />
        </Col>
        <Col span={8}>
          <Divider orientation="left">PAYMENT</Divider>
          <Select
      style={{ width: 300 }}
      placeholder="custom dropdown render"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
              // ref={inputRef}
              // value={name}
              // onChange={onNameChange}
            />
            <Button type="text" icon={<PlusOutlined />}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={delivery.map((item) => ({ label: item.title, value: item.price }))}
    />
          <List
            style={{padding: '20px'}}
            itemLayout="horizontal"
            dataSource={dataPayment}
            renderItem={(item, index) => (
              //  {const urlFb = await getUrlImg(item.src);}
              <List.Item>
                <List.Item.Meta title={<div>{item.title}</div>} />
                <div>
                {item.price === 0 ? <>--</> : valueDlv === "FREE" && item.title ==="shipping fees" ? <>FREE</> : <> {item.price} $</> }</div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
export default CartComponent;
