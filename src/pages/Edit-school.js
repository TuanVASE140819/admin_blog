import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Col,
  Row,
  Modal,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { getSchoolDetail, updateSchool } from "../api/apiService"; // Assuming updateAccount is imported correctly
import axios from "axios";
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
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [school, setSchool] = useState(null);
  const [Logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    getSchoolDetail(id)
      .then((response) => {
        form.setFieldsValue(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, form]);

  const onProvinceChange = (value) => setSelectedProvince(value);
  const onDistrictChange = (value) => setSelectedDistrict(value);
  const onWardChange = (value) => setSelectedWard(value);
  const onLevelChange = (value) => setSelectedLevel(value);

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

  const onFinish = (values) => {
    Modal.confirm({
      title: "Are you sure you want to save these changes?",
      content: "If you click OK, the changes will be saved.",
      onOk() {
        updateSchool({ ...values, id })
          .then((response) => {
            console.log("Update successful:", response);
          })
          .catch((error) => {
            console.error("Update failed:", error);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{
        padding: "20px",
        margin: "20px",
        border: "1px solid #e9e9e9",
        borderRadius: "2px",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/*  chi là 2 cột */}
      <Row>
        <Col span={12}>
          <Form.Item
            label="Banner:"
            name="banner"
            labelCol={{ span: 24 }} // label takes the full width
            wrapperCol={{ span: 24 }} // control takes the full width
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Avatar:"
            name="avatar"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Tên trường:"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên trường",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <div
            style={{
              display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              width: "100%",
            }}
          >
            <Form.Item
              label="Tỉnh/Thành phố:"
              name="tinh"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tỉnh/thành phố",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                style={{ width: "100%" }}
                onChange={onProvinceChange}
                allowClear
              >
                {province &&
                  province.map((item) => (
                    <Option key={item.province_id} value={item.province_name}>
                      {item.province_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Quận/Huyện:"
              name="quan"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn quận/huyện",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                style={{ width: "100%" }}
                onChange={onDistrictChange}
                allowClear
              >
                {district &&
                  district.map((item) => (
                    <Option key={item.district_id} value={item.district_name}>
                      {item.district_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Xã/Phường:"
              name="xa"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn quận/huyện",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                style={{ width: "100%" }}
                onChange={onDistrictChange}
                allowClear
              >
                <Option value="1">Quận 1</Option>
                <Option value="2">Quận 2</Option>
                <Option value="3">Quận 3</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Cấp học:"
              name="level"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                style={{ width: "100%" }}
                onChange={onDistrictChange}
                allowClear
              >
                <Option value="1">Mầm non</Option>
                <Option value="2">Tiểu học</Option>
                <Option value="3">Trung học</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Khu vực:"
              name="countryid"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                style={{ width: "100%" }}
                onChange={onDistrictChange}
                allowClear
              >
                <Option value="vietnam">Việt Nam</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label="Địa chỉ:"
            name="address"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Số điện thoại:"
            name="phone"
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng nhập số điện thoại",
            //   },
            // ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Email:"
            name="email"
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng nhập email",
            //   },
            // ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="nội dung:"
            name="content"
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng nhập mô tả",
            //   },
            // ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <TextArea style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>Đang cập nhật</Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditSchool;
