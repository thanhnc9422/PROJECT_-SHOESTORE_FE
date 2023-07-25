import { signInWithPopup } from "@firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../../FirebaseConfig";
import { login } from "../../store/userActions";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, notification, Space } from "antd";
import { FacebookOutlined } from "@ant-design/icons";
import "../../styles/global.scss";
import "./Login.scss";
import axios from "axios";
import { addUser } from "../../redux/userSlice";

const Login = () => {
  const myState = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(Array(1).fill(false));
  const [user, setUser] = useState();
  const [form] = Form.useForm();
  //* ============================ HANDLE LOGIN BY FACEBOOK ============================
  const handleLogin = async (index) => {
    handleLoading(index);
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        fetch(
          `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
        )
          .then((response) => response.blob())
          .then((blob) => {
            setUser({
              displayName: result.user.displayName,
              email: result.user.email,
              urlAvatar: URL.createObjectURL(blob),
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //* ============================ HANDLE LOGIN BY USERNAME AND PASSWORD ============================
  const onFinish = async (index) => {
    handleLoading(index);

    const username = form.getFieldValue().username;
    const password = form.getFieldValue().password;
    const response = await axios.post(
      "http://localhost:8080/login",
      {
        username,
        password,
      },
      { withCredentials: true}
    );
    if (response.data === "NOT FOUND") {
      notification.error({
        message: "Lỗi đăng nhập",
        description: "Username hoặc password không chính xác",
      });
      handleLoading(-1);
    } else {
      setUser({
        displayName: response.data.fullname,
        email: response.data.username,
        urlAvatar: "",
      });
      handleLoading(-1);
    }
  };
  //* ============================ WHEN USER CHANGE WILL BE REDIRECT TO /HOME ============================
  const handleLoading = (index) => {
    if (index < 0) {
      setLoading(Array(1).fill(false));
    } else {
      const newLoading = [...loading];
      newLoading[index] = true;
      setLoading(newLoading);
    }
  };

  useEffect(() => {
    if (user !== undefined) {
      dispatch(addUser(user));
      const newLoading = loading.map(() => false);
      setLoading(newLoading);
      navigate("/home");
    }
  }, [user]);
console.log(myState)
  return (
    <div className="login-main">
      {/* ============================ LOGO ============================ */}
      <Space direction="vertical" align="center" className="login-item">
        <div className="header">
          <div className="title">
            GG GANG
            <img src="./images/logo.png"></img>
          </div>
        </div>
        {/* ============================ UI LOGIN BY FACEBOOK ============================ */}
        <Button
          type="default"
          size="large"
          icon={<FacebookOutlined />}
          loading={loading[0]}
          onClick={() => handleLogin(0)}
        >
          Sign In With Facebook
        </Button>
        {/* ============================ UI LOGIN BY USERNAME AND PASSWORD ============================ */}

        <div>CONTINUE WITH YOUR ACCOUNT</div>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={() => onFinish(1)}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={loading[1]} type="primary" htmlType="submit">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default Login;
