/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 BluePink (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by BluePink
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState } from "react";

import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Select,
  Input,
  Modal,
} from "antd";

import {
  SearchOutlined,
  ToTopOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import face2 from "../assets/images/face-2.jpg";
import Search from "antd/lib/transfer/search";
// import style.css
import "./style.css";

const { Title } = Typography;
const { Option } = Select;

// table code start
const columns = [
  {
    title: (
      <>
        <UserOutlined /> Tên trường
      </>
    ),
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "Cấp bậc",
    dataIndex: "level",
    key: "level",
  },
  {
    title: (
      <>
        <EnvironmentOutlined /> Tỉnh
      </>
    ),
    dataIndex: "province",
    key: "province",
  },
  {
    title: "Huyện",
    dataIndex: "district",
    key: "district",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <>
        <Link to={`/manager-school/edit/${record.key}`}>
          <Button type="primary">Edit</Button>
        </Link>
      </>
    ),
  },
];

const data = [
  {
    key: "1",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face2}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>THCS Hùng Vương</Title>
            <p>hungvuong.xom.vn</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    level: (
      <>
        <div className="author-info">
          <Title level={5}>Cấp 1</Title>
        </div>
      </>
    ),

    province: (
      // tỉnh
      <div className="ant-employed">
        <span>Đồng Nai</span>
      </div>
    ),
    district: (
      <>
        <div className="ant-employed">
          <span>Long Thành</span>
        </div>
      </>
    ),
  },
  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face2}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>THCS Hùng Vương</Title>
            <p>hungvuong.xom.vn</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    level: (
      <>
        <div className="author-info">
          <Title level={5}>Cấp 1</Title>
        </div>
      </>
    ),

    province: (
      // tỉnh
      <div className="ant-employed">
        <span>Đồng Nai</span>
      </div>
    ),
    district: (
      <>
        <div className="ant-employed">
          <span>Long Thành</span>
        </div>
      </>
    ),
  },
  {
    key: "3",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face2}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>THCS Hùng Vương</Title>
            <p>hungvuong.xom.vn</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    level: (
      <>
        <div className="author-info">
          <Title level={5}>Cấp 1</Title>
        </div>
      </>
    ),

    province: (
      // tỉnh
      <div className="ant-employed">
        <span>Đồng Nai</span>
      </div>
    ),
    district: (
      <>
        <div className="ant-employed">
          <span>Long Thành</span>
        </div>
      </>
    ),
  },
];
// project table start

function ManagerSchool() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Add this line

  const onProvinceChange = (value) => setSelectedProvince(value);
  const onDistrictChange = (value) => setSelectedDistrict(value);

  const onSearch = (value) => setSearchTerm(value); // Modify this line

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // const filteredData = data.filter(
  //   (item) =>
  //     item.province === selectedProvince &&
  //     item.district === selectedDistrict &&

  // );

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách trường học"
              extra={
                <>
                  <Input
                    placeholder="Search by name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 200, padding: 10 }}
                  />
                  <Select
                    className="styled-select"
                    placeholder="Select a province"
                    onChange={onProvinceChange}
                    style={{ width: 120, padding: 10 }}
                  >
                    {/* Replace with your actual provinces */}
                    <Option value="province1">Province 1</Option>
                    <Option value="province2">Province 2</Option>
                  </Select>
                  <Select
                    className="styled-select"
                    placeholder="Select a district"
                    onChange={onDistrictChange}
                    style={{ width: 120 }}
                  >
                    {/* Replace with your actual districts */}
                    <Option value="district1">District 1</Option>
                    <Option value="district2">District 2</Option>
                  </Select>
                  <Select
                    className="styled-select"
                    placeholder="Select an option"
                    onChange={onDistrictChange} // Replace with your actual onChange handler
                    style={{ width: 120, marginLeft: 10 }} // Add some margin to the left to separate it from the previous select box
                  >
                    {/* Replace with your actual options */}
                    <Option value="option1">Option 1</Option>
                    <Option value="option2">Option 2</Option>
                  </Select>
                  {/* nút  tìm kiếm */}
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={onSearch}
                    style={{ marginLeft: 10 }}
                  >
                    Search
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space styled-table"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ManagerSchool;
