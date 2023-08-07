import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { Avatar, Button, Layout, List, message, Modal } from "antd";
import HeaderAnt from "../../components/HeaderAnt/HeaderAnt";
import TextShoe from "../../components/Text/TextShoe";
import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { storage } from "../../FirebaseConfig";
import Search from "antd/es/transfer/search";
import axios from "axios";
import "./ListShoes.scss";

const ListShoes = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchName, setSearchName] = useState();
  const [search, setSearch] = useState();
  const [shoes, setShoes] = useState();
  const [popup, setPopup] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/AllShoes");
      console.log(response.data);
      setShoes(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

//* ================================= HANDLE SEARCH =====================================
  const handleSearch = (event) => {
    setSearchName(event.target.value);
    if (event.target.value === "") {
      setSearch();
    } else {
      setSearch(
        shoes.filter((shoes) =>
          shoes.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
  };

  //* ================================= HANDLE ADD ======================================
  const metadata = {
    contentType: "image/jpeg",
  };
  const addShoe = async (name, price, file) => {
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    const demoUrl = await getDownloadURL(
      ref(storage, "images/" + file.name)
    ).then((url) => {
      formData.append("src", url);
    });
    console.log(formData.get("src"));
    try {
      const response = await axios.post(
        "http://localhost:8080/addShoe",
        formData,
        { withCredentials: true }
      );
      fetchData();
      setSearch(searchName);
    } catch (error) {
      console.log(error);
    }
    handleAfterSave();
  };

  //* ================================ HANDLE DELETE ====================================
  const deleteShoe = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/deleteShoe/" + id,
        { withCredentials: true }
      );
      fetchData();
      handleSearch(searchName);
    } catch (error) {
      console.log(error);
    }
    handleAfterSave();
  };

  //* =============================== HANDLE UPDATE =====================================
  const updateShoe = async (name, price, id) => {
    console.log("hihihi");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    try {
      const response = await axios.put(
        "http://localhost:8080/updateShoe/" + id,
        formData,
        { withCredentials: true }
      );
      fetchData();
      handleSearch(searchName);
    } catch (error) {
      console.log(error);
    }
    handleAfterSave();
  };

    //* ============================ HANDLE LOADING =====================================
  const handleAfterSave = () => {
    messageApi.open({
      key: "hehe",
      type: "success",
      content: "Loaded!",
      duration: 2,
    });
    setPopup();
  };
  //* ============================= SHOW MODAL FOR CRUD =================================
  const ShowModal = (item, visible, type) => {
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
            {type === "edit" ? (
              <TextShoe funcShoe={updateShoe} shoe={item} type={"edit"} />
            ) : type === "add" ? (
              <TextShoe funcShoe={addShoe} shoe={item} type={"add"} />
            ) : (
              <TextShoe funcShoe={deleteShoe} shoe={item} type={"delete"} />
            )}
          </div>
        </Modal>
      );
    }
  };

  const getUrlImg = async (src) => {
    getDownloadURL(ref(storage, "images/" + src)).then((url) => {
      return url;
    });
  };

  return (
    <div>
      {contextHolder}
      <Layout>
        <HeaderAnt />
        <Content>
          <Search
            placeholder="Nhập từ khóa tìm kiếm"
            allowClear
            enterButton={<SearchOutlined />}
            onChange={(event) => handleSearch(event)}
          />
          <List
            className="list-shoes"
            itemLayout="horizontal"
            dataSource={search ? search : shoes}
            renderItem={(item, index) => (
              //  {const urlFb = await getUrlImg(item.src);}
              <List.Item
                actions={[
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => ShowModal(item, true, "edit")}
                  >
                    Edit
                  </Button>,
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => ShowModal(item, true, "delete")}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.src} size="large" />}
                  title={<div>{item.name}</div>}
                  description={<div>{item.price}</div>}
                />
              </List.Item>
            )}
          />
          <div className="center-item" align="center">
            <Button
              icon={<FileAddOutlined />}
              onClick={() => ShowModal(null, true, "add")}
            >
              Add shoes
            </Button>
          </div>
        </Content>
        {popup}
      </Layout>
    </div>
  );
};

export default ListShoes;
