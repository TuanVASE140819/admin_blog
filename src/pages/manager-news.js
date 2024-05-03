import React from "react";
import { Button, Card, Form } from "antd";
import { list } from "firebase/storage";

// dât giả
const data = [
  {
    Title: "Đời sống",
    listNews: [
      {
        Title: "Góc Nhỏ Trường Học: Khoảnh Khắc Đón Chờ Bạn Cũ Quay Trở Lại",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
    ],
  },
  {
    Title: "Đời sống",
    listNews: [
      {
        Title: "Góc Nhỏ Trường Học: Khoảnh Khắc Đón Chờ Bạn Cũ Quay Trở Lại",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
    ],
  },
  {
    Title: "Đời sống",
    listNews: [
      {
        Title: "Góc Nhỏ Trường Học: Khoảnh Khắc Đón Chờ Bạn Cũ Quay Trở Lại",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
      {
        Title: "Dấu ấn Trường Xưa vào năm 1995",
        Description: "Một bài viết về những kỷ niệm đẹp của học sinh cũ",
      },
    ],
  },
];
const gridStyle = {
  //   cố định width và height cho mỗi grid
  width: "25%",
  height: "100px",
  textAlign: "center",
};
const ManagerNews = () => (
  <Form
    name="basic"
    style={{
      padding: "20px",
      margin: "20px",
      border: "1px solid #e9e9e9",
      borderRadius: "2px",
      backgroundColor: "#f5f5f5",
    }}
  >
    {/* nút thêm mới */}
    <Button type="primary" style={{ marginBottom: "20px" }}>
      THÊM MỚI CHỦ ĐỀ
    </Button>

    {data.map((item, index) => {
      return (
        <Card
          title={item.Title}
          style={{
            width: "100%",
            marginTop: "20px",
            border: "1px solid #e9e9e9",
            marginBottom: "20px",
          }}
          extra={<Button type="primary">Thêm mới</Button>}
        >
          {item.listNews.map((news, index) => {
            return <Card.Grid style={gridStyle}>{news.Title}</Card.Grid>;
          })}
        </Card>
      );
    })}
  </Form>
);
export default ManagerNews;
