import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Input, Button, List, Avatar, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Title from "antd/lib/skeleton/Title";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    [{ align: [] }], // Add alignment options
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align", // Add alignment option
];

const NewDetail = () => {
  const [value, setValue] = useState("");
  return (
    <Row
      style={{
        backgroundColor: "#f0f2f5",
        height: "80vh",
        padding: "20px",
        overflowY: "auto",

        backdropFilter: "blur(10px)",
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
        <Title level={2}>Tiêu đề bài viết</Title>
        <p>Ngày đăng: 01/01/2021</p>
        <img
          src="https://via.placeholder.com/1000x300"
          style={{ width: "100%", height: "auto" }}
          alt="Ảnh bài viết"
        />
      </Col>
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
        <Title level={2}>Tiêu đề bài viết</Title>
        <p>Ngày đăng: 01/01/2021</p>
        <img
          src="https://via.placeholder.com/1000x300"
          style={{ width: "100%", height: "auto" }}
          alt="Ảnh bài viết"
        />
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
        <ReactQuill
          theme="snow"
          style={{ height: "60vh" }}
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
        />
      </Col>
    </Row>
  );
};
export default NewDetail;
