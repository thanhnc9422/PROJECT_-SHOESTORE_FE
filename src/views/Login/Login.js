import { Button, Form, Input, notification, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../../FirebaseConfig";
import { FacebookAuthProvider } from "firebase/auth";
import { FacebookOutlined } from "@ant-design/icons";
import { signInWithPopup } from "@firebase/auth";
import { addUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/global.scss";
import axios from "axios";
import "./Login.scss";

const Login = () => {
  const myState = useSelector((state) => state.user.user);
  const [uidFb, setUidFb] = useState();
  const [loading, setLoading] = useState(Array(1).fill(false));
  const [user, setUser] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //* ============================ HANDLE LOGIN BY FACEBOOK =============================
  const handleLogin = async (index) => {
    handleLoading(index);
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        if(credential== null){
          console.log("not found credential");
        }
        if(accessToken== null){
          console.log("not found accessToken");
        }
        fetch(
          `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
        )
          .then((response) => response.blob())
          .then((blob) => {
            setUidFb(result.user.providerData[0].uid);
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


      const response = await axios.post(
        "http://localhost:8080/login",
        {
         uidFb : "result.user.providerData[0].uid",
        },
        { withCredentials: true}
      );
      if (response.data === "NOT FOUND") {
        notification.error({
          message: "Lỗi đăng nhập",
          description: "Username hoặc password không chính xác",
        });
  };
}
  //* ============================ HANDLE LOGIN BY USERNAME AND PASSWORD ================
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
        id: response.data.id,
        displayName: response.data.fullname,
        email: response.data.username,
        urlAvatar: "",
      });
      handleLoading(-1);
    }
  };
  //* ===================== LOADING AND STORE USER DATA TO REDUX ========================
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

  return (
    <div className="login-main">
{/* ============================ LOGO ============================= */}
      <Space direction="vertical" align="center" className="login-item">
        <div className="header">
          <div className="title">
            GG GANG
            <img src="./images/logo.png"></img>
          </div>
        </div>
{/* ====================== UI LOGIN BY FACEBOOK =================== */}
        <Button
          type="default"
          size="large"
          icon={<FacebookOutlined />}
          loading={loading[0]}
          onClick={() => handleLogin(0)}
        >
          Sign In With Facebook
        </Button>
{/* ============= UI LOGIN BY USERNAME AND PASSWORD =============== */}

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
