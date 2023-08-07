import React, { useState } from 'react';
import { Layout, Input, Button, List, Avatar, Affix, Space } from 'antd';
import './ChatFrame.scss';
import { CloseOutlined, UpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { Content } = Layout;
const ChatFrame = () => {
  const user = useSelector((state) => state.user.user);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [visible, setVisible] = useState(false);

    // Hàm xử lý gửi tin nhắn
    const handleSendMessage = () => {
      if (message.trim() !== '') {
        setMessages([...messages, { text: message, user: 'me' }]);
        setMessage('');
      }
    };
  
const handleCloseOrOpenChat = (text) => {
  if(text === 'open'){
      setVisible(true);
    }else{
      setVisible(false);
    }
    }
    return (
      <Affix offsetBottom={0} className='chat-frame'>
     

        {visible === true ? <>
          <Affix offsetTop={0} style={{margin:'0 0 5px 5px'}}>
        <Button icon={<CloseOutlined />} onClick={() => handleCloseOrOpenChat("close")}></Button>
        </Affix>
          <Content style={{ padding: '20px', height: '400px'}} className='content'>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://via.placeholder.com/40" />}
                  title={item.user === 'me' ? 'Me' : 'Other User'}
                  description={item.text}
                />
              </List.Item>
            )}
          />
     
        
        </Content>
        <Affix offsetBottom={10}>
          <Space align="center" className='item'>
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPressEnter={handleSendMessage}
            style={{ marginTop: '10px' }}
          />
          <Button type="primary" onClick={handleSendMessage} style={{marginTop: '10px', marginLeft: '10px' }}>
            Send
          </Button>
          </Space>
          </Affix>
        </> : <>
        <Affix offset={0} style={{margin:'0 0 5px 5px', position: 'absolute', bottom:'0px', right: '0px'}}>
        <Button icon={<UpOutlined />} onClick={() => handleCloseOrOpenChat("open")}></Button>
        </Affix>
        </>}
       
        </Affix>
    
    );
  };
  
  export default ChatFrame;