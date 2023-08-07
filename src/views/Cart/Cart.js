import { Layout, message } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import HeaderAnt from "../../components/HeaderAnt/HeaderAnt";
import CartComponent from "../../components/Cart/CartComponent";
import "./Cart.scss";
import { useSelector } from "react-redux";
import axios from "axios";
const Cart = () => {
  const user = useSelector((state) => state.user.user);
  const [shoes, setShoes] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [isDele, SetIsDele] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/cart/view/" + user.id,
        { withCredentials: true }
      );
      setShoes(response.data);
    };
    fetchData();
    SetIsDele(false)
  }, [isDele]);

  const removeFromCart = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    try {
      const response = await axios.post(
        "http://localhost:8080/cart/delete/" + user.id,
        formData,
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    SetIsDele(true);
    messageApi.open({
      key: "loadingCart",
      type: "success",
      content: "Loaded!",
      duration: 2,
    });
  };
  return (
    <div>
    {contextHolder}
      <Layout>
        <HeaderAnt />
        <Content>
          <CartComponent removeFromCart={removeFromCart} item={shoes} />
        </Content>
      </Layout>
    </div>
  );
};

export default Cart;
