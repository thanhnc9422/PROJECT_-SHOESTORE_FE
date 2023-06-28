import { Modal } from 'antd';
import React, { useState } from 'react';

const ModalAnt = ({visible}) => {
    const [visibleDemo, setVisibleDemo] = useState({visible});
console.log(visible)
    const showModal = () => {
      setVisibleDemo(true);
    };
  
    const handleOk = () => {
      setVisibleDemo(false);
    };
  
    const handleCancel = () => {
      setVisibleDemo(false);
    };
//   console.log(visibleDemo)
    return (
        
        <div>
        <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        closable={false}
        centered
      >
        <div>This is a content of the modal</div>
      </Modal>

        </div>
    );
};

export default ModalAnt;