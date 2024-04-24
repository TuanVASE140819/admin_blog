import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Row,
  Col,
  Card,
  DatePicker,
  Tag,
  Modal,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/skeleton/Title";

import { getAccountDetail, InactiveorActiveAccount } from "../api/apiService";

const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const EditAccount = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const handleChange = (info) => {};

  const [account, setAccount] = useState(null);
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    getAccountDetail(id)
      .then((response) => {
        setAccount(response.data);
        form.setFieldsValue(response.data); // Set form fields value
      })
      .catch((error) => {
        console.error("Failed to fetch account details:", error);
      });
  }, [id, form]);

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Handle form submission here
  };
  console.log("account", account?.name);
  return (
    //    // dùng antd  để tạo thành 2 dòng 1 cột
    <div>
      <Row>
        <Card
          title="Chỉnh sửa tài khoản"
          bordered={false}
          style={{ width: "100%" }}
        >
          <Form form={form} onFinish={onFinish} initialValues={account}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={3}>
                  {/* Upload ảnh bo tròn */}
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Col>
                <Col span={8}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start", // Change this line
                    }}
                  >
                    <Form.Item
                      label="Họ và tên:"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên tài khoản",
                        },
                      ]}
                      labelCol={{ span: 24 }} // label takes the full width
                      wrapperCol={{ span: 24 }} // control takes the full width
                    >
                      <Input
                        style={{ width: "300px" }}
                        defaultValue={account?.name}
                      />
                    </Form.Item>
                    {/*  form date */}
                    <Form.Item
                      label="Ngày sinh:"
                      name="date"
                      rules={[
                        {
                          required: true,
                          message: "Nhập ngày sinh",
                        },
                      ]}
                      labelCol={{ span: 24 }} // label takes the full width
                      wrapperCol={{ span: 24 }} // control takes the full width
                    >
                      {/* DATE */}
                      <DatePicker
                        format="DD/MM/YYYY"
                        style={{ width: "300px" }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Địa chỉ :"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền địa chỉ",
                        },
                      ]}
                      labelCol={{ span: 24 }} // label takes the full width
                      wrapperCol={{ span: 24 }} // control takes the full width
                    >
                      <Input style={{ width: "300px" }} />
                    </Form.Item>
                    <Form.Item
                      label="Email :"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập Email",
                        },
                      ]}
                      labelCol={{ span: 24 }} // label takes the full width
                      wrapperCol={{ span: 24 }} // control takes the full width
                    >
                      <Input style={{ width: "300px" }} />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="ID :"
                    name="id"
                    labelCol={{ span: 24 }} // label takes the full width
                    wrapperCol={{ span: 24 }} // control takes the full width
                  >
                    <Input style={{ width: "300px" }} disabled />
                  </Form.Item>
                  <Form.Item
                    label="Phân quyền :"
                    name="role"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên tài khoản",
                      },
                    ]}
                    labelCol={{ span: 24 }} // label takes the full width
                    wrapperCol={{ span: 24 }} // control takes the full width
                  >
                    <Select style={{ width: "300px" }}>
                      <Option value="admin">Admin</Option>
                      <Option value="user">User</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Ngày tạo :"
                    name="createDate"
                    labelCol={{ span: 24 }} // label takes the full width
                    wrapperCol={{ span: 24 }} // control takes the full width
                  >
                    <Input style={{ width: "300px" }} disabled />
                  </Form.Item>
                  <Form.Item
                    label="Trạng thái :"
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên tài khoản",
                      },
                    ]}
                    labelCol={{ span: 24 }} // label takes the full width
                    wrapperCol={{ span: 24 }} // control takes the full width
                  >
                    {account?.status === "active" ? (
                      <Tag color="green">Hoạt động</Tag>
                    ) : (
                      <Tag color="red">Không hoạt động</Tag>
                    )}
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      Modal.confirm({
                        title:
                          "Bạn có chắc chắn muốn thay đổi trạng thái tài khoản không?",
                        // The text to be displayed in the modal
                        content:
                          "Khi bạn nhấn OK, trạng thái tài khoản sẽ thay đổi",
                        onOk() {
                          // Optional callback for when the user clicks the confirm button
                          InactiveorActiveAccount(id)
                            .then((response) => {
                              console.log(
                                "Account status changed successfully"
                              );
                            })
                            .catch((error) => {
                              console.error(
                                "Failed to change account status:",
                                error
                              );
                            });
                        },
                        onCancel() {
                          // Optional callback for when the user clicks the cancel button
                          console.log("Cancel");
                        },
                      });
                    }}
                  >
                    Khoá tài khoản
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Ghi chú :"
                    name="note"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên tài khoản",
                      },
                    ]}
                    labelCol={{ span: 24 }} // label takes the full width
                    wrapperCol={{ span: 24 }} // control takes the full width
                  >
                    <TextArea style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            {/* nút lưu */}
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default EditAccount;