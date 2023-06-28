import React from "react";
import {Affix, Col, Layout, Menu, Row } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import "./HeaderAnt.scss";
const HeaderAnt = () => {
  return (
    <div className="layout-ant">
     <Affix offsetTop={-20}>
        <Header>
          <div className="demo-logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="home">
              <NavLink to="/todos" activeClassName="active" exact={true}>
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key="listperson">
              <NavLink
                to="/listperson" activeClassName="active" exact={true}>
                List Person
              </NavLink>
            </Menu.Item>
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
