import { signInWithPopup } from "@firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../../FirebaseConfig";
import { login } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Space } from "antd";
import {
  FacebookOutlined,
  MailOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import "../../styles/global.scss";
import "./Login.scss";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(Array(2).fill(false));
  const myState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const handleLogin = (index) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        fetch(
          `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
        )
          .then((response) => response.blob())
          .then((blob) => {
            //  setUser({displayName : result.user.displayName, email : result.user.email, urlAvatar : URL.createObjectURL(blob)});
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
    const newLoading = [...loading];
    newLoading[index] = true;
    setLoading(newLoading);
  };
  const onFinish = () => {};
  const onFinishFailed = () => {};
  useEffect(() => {
    dispatch(login(user));
    if (user !== undefined) {
      const newLoading = loading.map(() => false);
      setLoading(newLoading);
      navigate("/home");
    }
  }, [user]);

  console.log(myState);
  return (
    <div className="login-main">
      <Space direction="vertical" align="center" className="login-item">
        <div className="header">
          <div className="title">GG GANG 
          <img src="./images/logo.png"></img>
          </div>
        </div>

        <Button
          type="default"
          size="large"
          icon={<FacebookOutlined />}
          loading={loading[0]}
          onClick={() => handleLogin(0)}
        >
          Sign In With Facebook
        </Button>
        <Button
          type="default"
          size="large"
          icon={<MailOutlined />}
          loading={loading[1]}
          onClick={() => handleLogin(1)}
        >
          Sign In With Gmail
        </Button>
        <div>OR</div>
        <div>CONTINUE WITH YOUR ACCOUNT</div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={() => onFinish()}
          onFinishFailed={() => onFinishFailed()}
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
            <Button type="primary" htmlType="submit">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default Login;
