import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, Modal, Select, Space } from "antd";
import { Option } from "antd/es/mentions";
import Upload from "antd/es/upload/Upload";
import { useState } from "react";

const TextShoe = ({ shoe, type, funcShoe }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState();
  const [form] = Form.useForm();
  const handleShowModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };
  const handleSubmit = () => {
   
    if (type === "show"){
      messageApi.open({
        type: "success",
        content: "Loaded!",
        duration: 2,
      });
      funcShoe(
        shoe.id
      )
      return;
    }
    messageApi.open({
      key: "hehe",
      type: "loading",
      content: "Loading...",
    });
    if (type === "edit") {
      funcShoe(
        form.getFieldValue().name ? form.getFieldValue().name : shoe.name,
        form.getFieldValue().price ? form.getFieldValue().price : shoe.price,
        shoe.id
      );

      form.setFieldsValue({
        name: null,
        price: null,
      });
    }
    if (type === "add") {
      funcShoe(
        form.getFieldValue().name ? form.getFieldValue().name : shoe.name,
        form.getFieldValue().price ? form.getFieldValue().price : shoe.price,
        file
      );
    }
    if (type === "delete") {
      funcShoe(shoe.id);
    }
  };
  return (
    <div>
    {contextHolder}
      <Space>
        {type === "show" ? (
          /* =========================== MODAL VIEW ========================== */
          <>
            <img alt="" className="img-item" src={shoe.src} />
            <Card title={shoe.name} size="small">
              <p>
                Gucci products are made with carefully selected materials.
                Please handle with care for longer product life. Protect from
                direct light, heat and rain.
              </p>
              <Space.Compact block>
                <Select
                  style={{ width: "150px" }}
                  defaultValue="Select Size (US)"
                >
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
                <Button
                  type="link"
                  icon={<SearchOutlined />}
                  onClick={() => handleShowModal()}
                >
                  VIEW SIZE GUIDE
                </Button>
              </Space.Compact>
              <Button style={{marginTop:'5px'}} onClick={() => handleSubmit()}>ADD TO CART</Button>
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
                </Button>,
              ]}
            >
              <img
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                src="./images/size-guide.png" alt=""
              ></img>
            </Modal>
        
          </>
        ) : type === "edit" ? (
          /* =========================== MODAL EDIT ========================== */
          <>
            <img
              style={{ width: 200 }}
              alt=""
              className="img-item"
              src={shoe.src}
            />
            <Card title="Manage shoe" size="small">
              <Form
                form={form}
                onFinish={() => handleSubmit()}
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 800 }}
                initialValues={{ remember: true }}
                autoComplete="off"
              >
                <Form.Item label="New name" name="name">
                  <Input defaultValue={shoe.name} />
                </Form.Item>
                <Form.Item label="New price" name="price">
                  <Input defaultValue={shoe.price} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  {contextHolder}
                  <Button type="primary" htmlType="Save">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </>
        ) : type === "add" ? (
          /* =========================== MODAL ADD =========================== */
          <>
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
                <Form.Item label="image" name="img">
                  <Upload
                    beforeUpload={(file) => {
                      // Access file content here and do something with it
                      setFile(file);
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item label="New name" name="name">
                  <Input />
                </Form.Item>

                <Form.Item label="New price" name="price">
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  {contextHolder}
                  <Button type="primary" htmlType="Save">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </>
        ) : (
          /* ========================= MODAL DELETE ========================== */
          <>
            Do you want to delete this shoe?
            <Button onClick={() => handleSubmit()}>Confirm</Button>
          </>
        )}
      </Space>
    </div>
  );
};

export default TextShoe;
