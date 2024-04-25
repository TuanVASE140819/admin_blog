import React, { useEffect, useState } from "react";

import { Row, Col, Card, Table, Button, Pagination, Tag, Input } from "antd";

import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./style.css";

import { getAccount } from "../api/apiService";

// table code start
const columns = [
  {
    title: (
      <>
        <UserOutlined /> Tài khoản
      </>
    ),
    dataIndex: "username",
    key: "username",
    width: "32%",
  },

  {
    title: "Phân quyền",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (text, record) => (
      <>
        {record.status === "active" ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Không hoạt động</Tag>
        )}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <>
        <Link to={`/manager-account/edit/${record.id}`}>
          <Button type="primary">Chỉnh sửa</Button>
        </Link>
      </>
    ),
  },
];

// project table start

function ManagerAccount() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [account, setaccount] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await getAccount(searchTerm, currentPage, pageSize);
      setaccount(response.data);
      setTotalItems(response.totalItems);
    };
    fetchAccount();
  }, [searchTerm, currentPage, pageSize]);

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

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách tài khoản"
              extra={
                <>
                  <Input
                    placeholder="Search by name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 200, padding: 10 }}
                  />

                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    // onClick={performSearch}
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
                  dataSource={account}
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

export default ManagerAccount;
