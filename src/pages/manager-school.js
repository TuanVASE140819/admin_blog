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
import React, { useEffect, useState } from "react";

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
  Pagination,
  Form,
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

import { getListSchool, createSchool } from "../api/apiService";
import axios from "axios";

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
    dataIndex: "captruong",
    key: "captruong",
  },
  {
    title: (
      <>
        <EnvironmentOutlined /> Tỉnh
      </>
    ),
    dataIndex: "tinh",
    key: "tinh",
  },
  {
    title: "Huyện",
    dataIndex: "quan",
    key: "quan",
  },
  {
    title: "Nhóm",
    dataIndex: "group",
    key: "group",
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
    group: (
      <>
        {/* hiện thị bao nhiêu nhóm */}
        <Button className="ant-employed">
          <span>1</span>
          Nhóm
        </Button>
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
    group: (
      <>
        {/* hiện thị bao nhiêu nhóm */}
        <Button className="ant-employed">
          <span>1</span>
          Nhóm
        </Button>
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
    group: (
      <>
        {/* hiện thị bao nhiêu nhóm */}
        <Button className="ant-employed">
          <span>1</span>
          Nhóm
        </Button>
      </>
    ),
  },
];
// project table start

function ManagerSchool() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [schools, setSchools] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [option, setOption] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await getListSchool(
        selectedProvince || "",
        selectedDistrict || "",
        "",
        "",
        "",
        currentPage,
        pageSize
      );
      setSchools(response.data);
      setTotalItems(response.paging.totalItems);
    };

    fetchSchools();
  }, [currentPage, pageSize, selectedProvince, selectedDistrict]);

  function performSearch() {
    getListSchool(
      selectedProvince || "",
      selectedDistrict || "",
      "",
      selectedLevel || "",
      searchTerm,
      currentPage,
      pageSize
    ).then((res) => {
      setSchools(res.data);
      setTotalItems(res.paging.totalItems);
    });
  }
  console.log("currentPage", pageSize);
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onProvinceChange = (value) => setSelectedProvince(value);
  const onDistrictChange = (value) => setSelectedDistrict(value);
  const onLevelChange = (value) => setSelectedLevel(value);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    createSchool(values)
      .then((response) => {
        console.log(response);
        // Close the modal after successful submission
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await axios.get(
        "https://vapi.vnappmob.com/api/province"
      );
      //  bỏ kí tự "tỉnh " và "thành phố " trong tên tỉnh name
      const provinces = response.data.results.map((item) => ({
        province_id: item.province_id,
        province_name: item.province_name
          .replace("Tỉnh ", "")
          .replace("Thành phố ", ""),
      }));

      setProvince(provinces);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${selectedProvince}`
      );

      const districts = response.data.results.map((item) => ({
        district_id: item.district_id,
        district_name: item.district_name
          .replace("Huyện ", "")
          .replace("Quận ", ""),
      }));

      console.log("districts", districts);
      setDistrict(districts);
    };
    if (selectedProvince) {
      fetchDistricts();
    }
  }, [selectedProvince || ""]);

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
                    placeholder="TIm kiếm theo tên trường"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 200, padding: 10 }}
                  />
                  <Select
                    className="styled-select"
                    placeholder="Tỉnh"
                    onChange={onProvinceChange}
                    style={{ width: 120, padding: 10 }}
                  >
                    {
                      // Replace with your actual provinces
                      province &&
                        province.map((item) => (
                          <Option
                            key={item.province_name}
                            value={item.province_name}
                          >
                            {item.province_name}
                          </Option>
                        ))
                    }
                  </Select>
                  <Select
                    className="styled-select"
                    placeholder="Quận"
                    onChange={onDistrictChange}
                    style={{ width: 120 }}
                    disabled={true} // Disable the select box if no province is selected
                  >
                    {
                      // Replace with your actual districts
                      district &&
                        district.map((item) => (
                          <Option
                            key={item.district_name}
                            value={item.district_id}
                          >
                            {item.district_name}
                          </Option>
                        ))
                    }
                  </Select>
                  <Select
                    className="styled-select"
                    placeholder="Cấp trường"
                    onChange={onLevelChange}
                    style={{ width: 120, marginLeft: 10 }} // Add some margin to the left to separate it from the previous select box
                  >
                    {/* Replace with your actual options */}
                    <Option value="Tiểu học">Tiểu học</Option>
                    <Option value="Trung học">Trung học</Option>
                    <Option value="Trung học phổ thông">
                      Trung học phổ thông
                    </Option>
                    <Option value="Trung cấp">Trung cấp</Option>
                    <Option value="Cao đẳng">Cao đẳng</Option>
                    <Option value="Đại học">Đại học</Option>
                  </Select>
                  {/* nút  tìm kiếm */}
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={performSearch}
                  >
                    Tìm kiếm
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Button type="primary" onClick={showModal}>
                  Thêm trường
                </Button>
                <Modal
                  title="Thêm trường"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Form form={form} onFinish={onFinish}>
                    {/*
                    name
                    banner
                     avatar
                     content
                    address
                    phone
                    email
                    tinh
                    quan
                    xa
                    captruong
                    countryid
                     */}
                    <Form.Item
                      label="Tên trường"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input the school name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="Banner" name="banner">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Avatar" name="avatar">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="content">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="address">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="phone">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Tỉnh"
                      name="tinh"
                      rules={[
                        {
                          required: true,
                          message: "Hãy chọn tỉnh!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Quận"
                      name="quan"
                      rules={[
                        {
                          required: true,
                          message: "Hãy chọn quận!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Xã"
                      name="xa"
                      rules={[
                        {
                          required: true,
                          message: "Hãy chọn xã!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Cấp trường"
                      name="captruong"
                      rules={[
                        {
                          required: true,
                          message: "Hãy chọn cấp trường!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    {/* select chọn khu vực */}
                    <Form.Item
                      label="Khu vực"
                      name="countryid"
                      rules={[
                        {
                          required: true,
                          message: "Hãy chọn khu vực!",
                        },
                      ]}
                    >
                      <Select
                        className="styled-select"
                        placeholder="Select a country"
                        style={{ width: 120 }}
                      >
                        <Option value="vietnam">Việt Nam</Option>
                        <Option value="country2">Country 2</Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </Modal>
                <Table
                  columns={columns}
                  dataSource={schools}
                  pagination={false}
                  className="ant-border-space styled-table"
                />
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalItems}
                  onChange={handlePageChange}
                  className="custom-pagination"
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
