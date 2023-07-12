import React from "react";
import {
  Affix,
  Avatar,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import "./HeaderAnt.scss";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
const HeaderAnt = () => {
  const user = useSelector((state) => state.user);

  const item01 = [
    {
      key: "1",
      label: (
        <NavLink to="/login" activeClassName="active" exact={true}>
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
              <NavLink to="/todos" activeClassName="active" exact={true}>
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key="listperson">
              <NavLink to="/listperson" activeClassName="active" exact={true}>
                List Person
              </NavLink>
            </Menu.Item>
            <Space className="info">
              <Dropdown menu={{ items : item01}} placement="bottomLeft" arrow>
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
              <Dropdown menu={{ items : item02}} placement="bottomLeft" arrow>
                {user ? <Space>MANAGE</Space> : <Space></Space>}
              </Dropdown>
            </Space>
          </Menu>
        </Header>
      </Affix>

      {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
    </div>
  );
};

export default HeaderAnt;
