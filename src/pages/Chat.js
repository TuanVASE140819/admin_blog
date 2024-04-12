import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Input, Button, List, Avatar } from "antd";
import { SendOutlined } from "@ant-design/icons";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message) {
      // Thêm tin nhắn từ người dùng vào danh sách tin nhắn
      setMessages(prevMessages => [
        ...prevMessages,
        { text: message, from: "user" }
      ]);
      setMessage("");
  
      // Gọi API
      const accessToken = "pat_skGFZt2MaI6DRLNXOCT2cLV5fxlPVHX6MqlpRjP267QFzMxZfivsaTotZJJHEb2n";
      const botId = "7356199278052327432";
      const url = "https://api.coze.com/open_api/v2/chat";
      const data = {
        conversation_id: "123",
        bot_id: botId,
        user: "123333333",
        query: message,
        stream: false,
      };
  
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          Accept: "*/*",
          Host: "api.coze.com",
          Connection: "keep-alive",
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        // Xử lý tin nhắn trả về từ bot và thêm vào danh sách tin nhắn
        const botMessages = data.messages.filter((item) => item.type === "answer" && item.content_type === "text");
        const formattedMessages = botMessages.map((item) => {
          const contentLines = item.content.split("\n");
          const formattedContent = contentLines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ));
          return {
            text: formattedContent,
            from: "bot",
          };
        });
        setMessages(prevMessages => [...prevMessages, ...formattedMessages]);
      })  
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };
  

  return (
    <Row>
      <Col span={24}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item style={{ justifyContent: item.from === "user" ? "flex-end" : "flex-start" }}>
              {item.from === "user" ? (
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="You"
                  description={item.text}
                />
              ) : (
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Bot"
                  description={item.text}
                />
              )}
            </List.Item>
          )}
        />
        <div ref={bottomRef} />
      </Col>
      <Col span={24}
        style={{
          position: "fixed",
          bottom: 50,
          left: 300,
          width: "1300px",
          padding: "10px",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={sendMessage}
          suffix={
            <Button
              onClick={sendMessage}
              type="primary"
              icon={<SendOutlined />}
            >
              Send
            </Button>
          }
        />
      </Col>
    </Row>
  );
}

export default Chat;
