import { SearchOutlined } from "@ant-design/icons";
import { async } from "@firebase/util";
import { Button, Card, Form, Input, Modal, Select, Space } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../store/actions/userActions";

const TextShoe = ({ shoe , type, updateShoe}) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
  const handleShowModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };
  const handleSubmit = () => {
    updateShoe(form.getFieldValue().name, form.getFieldValue().price, shoe.id)
    form.setFieldsValue({
      name: null,
      price: null,
    });

  }
  return (
    <div>
      <Space>
       {type === "show"? <> <img alt="" className="img-item" src={"./images/" + shoe.src + ".png"} />
        <Card title={shoe.name} size="small">
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
        </Modal></> :<>


        <img style={{width : 200}} alt="" className="img-item" src={"./images/" + shoe.src + ".png"} />
        <Card title="Manage shoe" size="small">
        <Form
        form={form}
    onFinish={() => handleSubmit()}
    name="basic"
    labelCol={{ span: 10 }}
    wrapperCol={{ span: 14 }}
    style={{ maxWidth: 800 }}
    initialValues={{ remember: true }}
    // onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="New name"
      name="name">
      <Input placeholder={shoe.name}/>
    </Form.Item>

    <Form.Item
      label="New price"
      name="price" >
      <Input placeholder={shoe.price}/>
    </Form.Item>
   
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="Save">
        Save
      </Button>
    </Form.Item>
  </Form>
        </Card>
        </>}
      </Space>
     
    </div>
  );
};

export default TextShoe;
