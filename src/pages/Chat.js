import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Input, Button, List, Avatar, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state variable for loading status
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, from: "user" },
      ]);
      setMessage("");

      setIsLoading(true); // Set loading status to true when API call starts

      const accessToken =
        "pat_skGFZt2MaI6DRLNXOCT2cLV5fxlPVHX6MqlpRjP267QFzMxZfivsaTotZJJHEb2n";
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
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false); // Set loading status to false when API call ends

          const botMessages = data.messages.filter(
            (item) => item.type === "answer" && item.content_type === "text"
          );
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
          setMessages((prevMessages) => [
            ...prevMessages,
            ...formattedMessages,
          ]);
        })
        .catch((error) => {
          setIsLoading(false); // Set loading status to false when API call ends
          console.error("Error:", error);
        });
    }
  };

  return (
    <Row
      style={{
        backgroundColor: "#f0f2f5",
        height: "80vh",
        padding: "20px",
        overflowY: "auto",
        // backgroundImage: `url("data:image/svg+xml;utf8,<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 296 131'><defs><style>.cls-1{fill:%23282828;}</style></defs><path class='cls-1' d='M49.53,83.59a33.19,33.19,0,1,1,20.2-59.53,6,6,0,0,1,.2,9.45h0a6,6,0,0,1-7.5.17A21.12,21.12,0,1,0,65.65,64l9.21,7.8A33.13,33.13,0,0,1,49.53,83.59Z'/><path class='cls-1' d='M110,18.9h12.07a0,0,0,0,1,0,0V76.43a6,6,0,0,1-6,6h0a6,6,0,0,1-6-6V18.9A0,0,0,0,1,110,18.9Z'/><path class='cls-1' d='M151.35,82.43,118.47,49.55l29.47-29.47a6,6,0,0,1,8.54,0h0a6,6,0,0,1,0,8.53L135.54,49.55,159.88,73.9Z'/><ellipse class='cls-1' cx='85.21' cy='50.04' rx='11.83' ry='4.75'/><ellipse class='cls-1' cx='169.69' cy='50.04' rx='11.83' ry='4.75'/><path class='cls-1' d='M217.69,82.14H194.33V24.67a6.74,6.74,0,0,1,6.74-6.74H218a32.14,32.14,0,0,1,32.1,32.12C250.06,67.7,235.34,82.14,217.69,82.14ZM206.4,70.07H218A20,20,0,0,0,218,30H206.4Z'/><path class='cls-1' d='M272.77,38.75a7.24,7.24,0,1,1,5.7-12.31,1.13,1.13,0,0,1-.16,1.73h0a1.13,1.13,0,0,1-1.43-.13,5,5,0,1,0,1.3,4.62h-4.86V30.41h7.24v1.12A7.24,7.24,0,0,1,272.77,38.75Z'/><rect class='cls-1' x='278.31' y='31.53' width='2.25' height='6.83'/><path class='cls-1' d='M273.24,45.21A13.76,13.76,0,1,1,287,31.45,13.78,13.78,0,0,1,273.24,45.21Zm0-25.75a12,12,0,1,0,12,12A12,12,0,0,0,273.24,19.46Z'/><path class='cls-1' d='M55.25,116.07a12.84,12.84,0,0,1-7.93,2.62c-5.64,0-9.89-3.94-9.89-9.38s4.35-9.38,10.15-9.38a9.75,9.75,0,0,1,6.89,2.49l-2.07,2.69a7.21,7.21,0,0,0-4.87-1.68c-3.89,0-6.14,2.33-6.14,5.86s2.18,5.95,6.09,5.95a7.57,7.57,0,0,0,4.2-1.14v-2.74H47V108h8.26Z'/><path class='cls-1' d='M75.22,110.63c0,5.05-3.57,8.09-8.31,8.09s-8.34-3-8.34-8.09V100.24h3.88v10.39a4.46,4.46,0,1,0,8.91,0V100.24h3.86Z'/><path class='cls-1' d='M90.9,115.24h-9l-1.35,3.14H76.42l8.26-18.16h3.5l8.24,18.16H92.25ZM89.5,112l-2.67-6.27-.41-1.08L86,105.68,83.33,112Z'/><path class='cls-1' d='M106.65,112.68h-4.4v5.7H98.41V100.24h9.28c4,0,6.65,2.28,6.65,6.07a5.93,5.93,0,0,1-3.73,5.77l4.69,6.3h-4.63Zm-4.4-3.39H107c2.49,0,3.4-1.25,3.4-2.93,0-2-1.17-2.72-3.42-2.72h-4.74Z'/><path class='cls-1' d='M130.38,115.24h-9l-1.35,3.14H115.9l8.26-18.16h3.5l8.24,18.16h-4.17ZM129,112l-2.67-6.27-.41-1.08-.42,1.08L122.82,112Z'/><path class='cls-1' d='M154.89,118.38h-2.72l-10-11.92-.39-.65v12.57h-3.84V100.24h3.37l9.43,11.14.36.65V100.24h3.84Z'/><path class='cls-1' d='M173,103.64h-5.55v14.74h-3.83V103.64H158.1v-3.4H173Z'/><path class='cls-1' d='M180,107.47h9.56v3.32H180V115h10.52v3.39H176.21V100.24h14.25v3.4H180Z'/><path class='cls-1' d='M197.74,107.47h9.56v3.32h-9.56V115h10.52v3.39H193.93V100.24h14.25v3.4H197.74Z'/><path class='cls-1' d='M229.42,109.34c0,5.7-4,9-9.56,9h-8.21V100.24h8.06C225.33,100.24,229.42,103.56,229.42,109.34Zm-13.91-5.73V115h4.3c2.44,0,5.67-.65,5.67-5.63s-3.34-5.75-5.82-5.75Z'/></svg>")`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        backdropFilter: "blur(10px)",
        //  tôi muốn backgroundimage ovaleay màu trắng
        //  background: "rgba(255, 255, 255, 0.8)",
      }}
    >
      {" "}
      {/* Thay đổi màu nền của hàng */}
      <Col
        style={{
          // hiệu ứng nền mờ
          backdropFilter: "blur(10px)",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Thay đổi màu nền của cột
        }}
        span={24}
      >
        <List
          style={{
            height: "55vh",
            padding: "20px",
            overflowY: "auto",
            backgroundColor: "#f0f2f5", // Thay đổi màu nền của danh sách
          }}
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              style={{
                justifyContent:
                  item.from === "user" ? "flex-end" : "flex-start",
                backgroundColor: "#yourColor", // Thay đổi màu nền của mục
                borderRadius: "5px", // Làm tròn góc của mục
              }}
            >
              {item.from === "user" ? (
                <List.Item.Meta
                  // căn lề phải cho tin nhắn của người dùng và chat có khung viền màu xanh
                  style={{
                    textAlign: "right",
                  }}
                  title="You"
                  description={item.text}
                />
              ) : (
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://skin-face-scan.vercel.app/static/media/aigirl.ca96aef0548a3226dfbe.png" />
                  }
                  title="Chuyên gia content"
                  description={item.text}
                />
              )}
            </List.Item>
          )}
        />
        {isLoading && <Spin />}{" "}
        {/* Render loading spinner when API call is pending */}
        <div ref={bottomRef} />
      </Col>
      <Col
        span={24}
        style={{
          padding: "20px",
          backdropFilter: "blur(10px)",
          marginTop: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Thay đổi màu nền của cột
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