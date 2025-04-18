import React, { useEffect } from 'react';

const ChatComponent = () => {
  useEffect(() => {
    // 添加事件监听器来处理 'message' 事件
    const handleResizeMessage = (event: {
      data: { action: string; width: string; height: string; bottom: string };
    }) => {
      if (event.data.action === 'resizeChat') {
        const chatIframe = document.getElementById('paal-chat');
        if (chatIframe) {
          chatIframe.style.width = event.data.width;
          chatIframe.style.height = event.data.height;
          chatIframe.style.bottom = event.data.bottom;
        }
      }
    };

    window.addEventListener('message', handleResizeMessage, false);

    // 清除事件监听器，防止内存泄漏
    return () => {
      window.removeEventListener('message', handleResizeMessage);
    };
  }, []);

  return (
    <div>
      <iframe
        id="paal-chat"
        src="https://app.paal.ai/wg?bid=ccee00d2"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        allowtransparency="true"
        // allowTransparency={true}
        style={{
          colorScheme: 'normal',
          border: 'none',
          position: 'fixed',
          right: '-20px',
          bottom: '-90px',
          width: '100px',
          height: '170px',
          zIndex: 9999,
          backgroundColor: 'transparent',
        }}
        frameBorder="0"
      />
    </div>
  );
};

export default ChatComponent;
