import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Select, Space } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";

const TextShoe = ({ shoeName, shoeSrc }) => {
    const [visible, setVisible] = useState(false);
  const handleShowModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };
  return (
    <div>
      <Space>
        <img alt="" className="img-item" src={"./images/" + shoeSrc + ".png"} />
        <Card title={shoeName} size="small">
          <p>
            Gucci products are made with carefully selected materials. Please
            handle with care for longer product life. Protect from direct light,
            heat and rain.
          </p>
          <Space.Compact block>
            <Select style={{width : "150px"}} defaultValue="Select Size (US)">
              <Option value="Option1">5.5</Option>
              <Option value="Option2">6</Option>
              <Option value="Option3">6.5</Option>
              <Option value="Option4">7</Option>
              <Option value="Option5">7.5</Option>
              <Option value="Option6">8</Option>
              <Option value="Option7">8.5</Option>
              <Option value="Option8">9</Option>
              <Option value="Option9">9.5</Option>
              <Option value="Option10">10</Option>
              <Option value="Option11">10.5</Option>
              <Option value="Option12">11</Option>
              <Option value="Option13">11.5</Option>
              <Option value="Option14">12</Option>
              <Option value="Option15">12.5</Option>
            </Select>
            <Button type="link" icon={<SearchOutlined />} onClick={() => handleShowModal()}>
              VIEW SIZE GUIDE
            </Button>
          </Space.Compact>
        </Card>
        <Modal
          visible={visible}
          onOk={() => handleOk()}
          maskClosable={false}
          closable={false}
          centered
          footer={[
    <Button key="submit" type="primary" onClick={handleOk}>
      OK
    </Button>,]}
        >
            <img style={{ maxWidth: '100%', maxHeight: '100%' }} src="./images/size-guide.png"></img>
        </Modal>
      </Space>
    </div>
  );
};

export default TextShoe;
