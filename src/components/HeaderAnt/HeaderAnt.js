import React, { useEffect, useState } from "react";
import { Affix, Avatar, Badge, Dropdown, Menu, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import "./HeaderAnt.scss";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { removeUser } from "../../redux/userSlice";
import axios from "axios";
const HeaderAnt = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [countCart, setCountCart] = useState();


  // useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/cart/view/" + user.id,
        { withCredentials: true }
      );
     setCountCart(response.data.length);
    };
    fetchData();

  const handleLogout = async () => {
    if (user !== null) {
      dispatch(removeUser());
      const response = await axios.get("http://localhost:8080/user/logout", {
        withCredentials: true,
      });
    }
  };
  const item01 = [
    {
      key: "1",
      label: (
        <NavLink
          to="/login"
          activeClassName="active"
          exact={true}
          onClick={() => handleLogout()}
        >
          {user ? <> Logout</> : <>Login</>}
        </NavLink>
      ),
    },
  ];
  const item02 = [
    {
      key: "1",
      label: (
        <NavLink to="/listShoes" activeClassName="active" exact={true}>
          List shoes
        </NavLink>
      ),
    },
  ];
  return (
    <div className="layout-ant">
      <Affix offsetTop={0}>
        <Header>
          <div className="demo-logo" />
          <Menu theme="dark" mode="horizontal" className="menu">
            <Menu.Item key="home">
              <NavLink to="/home" activeClassName="active" exact={true}>
                Home
              </NavLink>
            </Menu.Item>
            <Space className="info">
              <Menu.Item key="Cart">
                <NavLink to="/cart" activeClassName="active" exact={true}>
                  <Badge count={countCart}>
                    <Avatar
                      shape="square"
                      icon={<ShoppingCartOutlined />}
                      size="large"
                    />
                  </Badge>
                </NavLink>
              </Menu.Item>
              <Dropdown menu={{ items: item01 }} placement="bottomLeft" arrow>
                {user ? (
                  <Space>
                    <Avatar size="large" src={user.urlAvatar} />
                    <div>{user.displayName}</div>
                  </Space>
                ) : (
                  <Space>
                    <Avatar size="large" icon={<UserOutlined />} />
                  </Space>
                )}
              </Dropdown>
              <Dropdown menu={{ items: item02 }} placement="bottomLeft" arrow>
                {user ? <Space>MANAGE</Space> : <Space></Space>}
              </Dropdown>
            </Space>
          </Menu>
        </Header>
      </Affix>
    </div>
  );
};

export default HeaderAnt;
