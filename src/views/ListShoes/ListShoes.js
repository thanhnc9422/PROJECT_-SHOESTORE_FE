import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { async } from "@firebase/util";
import { Avatar, Button, Layout, List, Modal, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import Search from "antd/es/transfer/search";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeaderAnt from "../../components/HeaderAnt/HeaderAnt";
import TextShoe from "../../components/Text/TextShoe";
import './ListShoes.scss';
const ListShoes = () => {
  const [shoes, setShoes] = useState();
  const [search, setSearch] = useState();
  const [demo, setDemo]  = useState();
  const [search01, setSearch01] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/AllShoes");
      console.log(response.data)
      setShoes(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  },[]);

  useEffect(() =>{
    setSearch(shoes)
  },[])
 const handleSearch = (event) => {
  setSearch01(event.target.value)
  if(event.target.value === ""){
setSearch()
  }else{
    setSearch(shoes.filter(shoes => shoes.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }
 }
 const handleOk = (item) => {

 }
//  const handleCancel = () => {
// setVisible(false);
//  }
const updateShoe = async (name, price, id) => {
  const formData = new FormData();
  formData.append('name',name);
  formData.append('price', price);   
  try {
    const response = await axios.put('http://172.20.10.4:8080/updateShoe/'+id, formData);
    fetchData();
    handleSearch(search01)
   
  } catch (error) {
    console.log(error);
  }
}

 const ShowModal = (item, visible) => {
  setDemo(<Modal
                        visible={visible}
                        onOk={() => handleOk(item)}
                        onCancel={() =>ShowModal(item,false)}
                        maskClosable={false}
                        closable={false}
                        centered
                      >
                       <TextShoe updateShoe = {updateShoe} shoe = {item} type = {"edit"}/>
                      </Modal>)
 }

  return (
    <div>
      <Layout>
        <HeaderAnt />
        <Content>
        <Search 
      placeholder="Nhập từ khóa tìm kiếm"
      allowClear
      enterButton={<SearchOutlined />}
     onChange={(event)=>handleSearch(event)}
    />
          <List className="list-shoes"
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={search? search : shoes}
            renderItem=
            {(item, index) => (
                <List.Item
                 actions={[<Button icon ={<EditOutlined />} onClick={()=>ShowModal(item, true)}>Edit</Button> , <Button icon={<DeleteOutlined />} danger>Remove</Button>]} >
              <List.Item.Meta
                avatar={
                  <Avatar src={"./images/" + item.src + ".png"} size="large" />
                }
                title={<div>{item.name}</div>}
                description={<div>{item.price}</div>}
              />
              </List.Item>
            )}
          />
        </Content>
        {demo}
      </Layout>
    </div>
  );
};

export default ListShoes;
