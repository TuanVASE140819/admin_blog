import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { updateAccount } from "../api/apiService"; // Assuming updateAccount is imported correctly
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
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const EditSchool = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [school, setSchool] = useState(null);
  const [Logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const { key } = useParams();

  useEffect(() => {
    fetch(`/api/schools/${key}`)
      .then((response) => response.json())
      .then((data) => setSchool(data))
      .catch((error) => console.error(error));
  }, [key]);

  const onProvinceChange = (value) => setSelectedProvince(value);
  const onDistrictChange = (value) => setSelectedDistrict(value);

  const onFinish = (values) => {
    console.log("Success:", values);
    updateAccount(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={school}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Banner" name="Banner">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
        >
          {Logo ? (
            <img src={Logo} alt="avatar" style={{ width: "100%" }} />
          ) : (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>
      <Form.Item label="Logo" name="logo">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
        >
          LOGO
        </Upload>
      </Form.Item>
      <Form.Item
        label="Tên trường"
        name="name"
        rules={[{ required: true, message: "Please input the school name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: "Please input the school name!" }]}
      >
        <Select
          className="styled-select"
          placeholder="Select a province"
          onChange={onProvinceChange}
          style={{ width: 420, padding: 10 }}
        >
          <Option value="province1">Province 1</Option>
          <Option value="province2">Province 2</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Cấp bậc"
        name="level"
        rules={[{ required: true, message: "Please input the school name!" }]}
      >
        <Select
          className="styled-select"
          placeholder="Select a province"
          onChange={onProvinceChange}
          style={{ width: 420, padding: 10 }}
        >
          <Option value="province1">Province 1</Option>
          <Option value="province2">Province 2</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Website"
        name="website"
        rules={[{ required: true, message: "Please input the school name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please input the school name!" }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label="Facebook"
        name="facebook"
        rules={[{ required: true, message: "Please input the school name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditSchool;
