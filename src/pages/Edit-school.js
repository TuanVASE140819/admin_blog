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
  Card,
  Descriptions,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { getSchoolDetail, updateSchool } from "../api/apiService"; // Assuming updateAccount is imported correctly
import axios from "axios";

import { uploadFile } from "../api/Firebase/uploadFile";

const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const information = [
  {
    title: "Diễn đàn hội nhóm đời sống",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse ",
    user: "1354",
  },
  {
    title: "Diễn đàn hội nhóm đời sống",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse ",
    user: "1354",
  },
];

const pencil = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
      className="fill-gray-7"
    ></path>
    <path
      d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
      className="fill-gray-7"
    ></path>
  </svg>,
];
const deletebtn = [
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
      fill="#111827"
      className="fill-danger"
    ></path>
  </svg>,
];
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
  const [imageUrl, setImageUrl] = useState(null);
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  function handleChange(info) {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
        form.setFieldsValue({ banner: imageUrl });
      });
    }
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

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
        <Col span={12} className="ant-card header-solid h-full">
          <Col
            span={24}
            md={24}
            style={{
              marginLeft: "20px",
              marginRight: "20px",
            }}
            className="mb-24 m-3"
          >
            <Form.Item
              label="Banner:"
              name="banner"
              labelCol={{ span: 24 }} // label takes the full width
              wrapperCol={{ span: 24 }} // control takes the full width
            >
              <Upload
                name="banner"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={uploadFile}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="banner" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
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
        </Col>
        <Col span={12}>
          <Col
            span={24}
            md={24}
            style={{
              marginLeft: "20px",
              marginRight: "20px",
            }}
            className="mb-24 m-3"
          >
            <Card
              className="header-solid h-full"
              bordered={false}
              title={[<h6 className="font-semibold m-0">Quản lý group</h6>]}
              bodyStyle={{ paddingTop: "0" }}
              extra={
                <Button type="link" className="darkbtn">
                  Xem thêm
                </Button>
              }
            >
              <Row gutter={[24, 24]}>
                {information.map((i, index) => (
                  <Col span={24} key={index}>
                    <Card className="card-billing-info" bordered="false">
                      <div className="col-info">
                        <Descriptions title={i.title} span={3}>
                          <Descriptions.Item
                            label="Số lượng thành viên"
                            span={3}
                          >
                            {i.user}
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                      <div className="col-action">
                        <Button type="link" danger>
                          {deletebtn}DELETE
                        </Button>
                        <Button type="link" className="darkbtn">
                          {pencil} EDIT
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          <Col
            span={24}
            md={24}
            style={{
              marginLeft: "20px",
              marginRight: "20px",
            }}
            className="mb-24 m-3"
          >
            <Card
              title="Bài viết nổi bật"
              extra={
                <Button type="link" className="darkbtn">
                  Xem thêm
                </Button>
              }
            >
              <Card
                type="inner"
                title="Thiên Nhiên"
                extra={
                  <Button type="link" className="darkbtn">
                    Xem
                  </Button>
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    // font bold
                    fontWeight: "bold",
                  }}
                >
                  "Điểm Dừng Kỷ Niệm: Gặp Lại Bạn Học Cũ Trên Đường Đời"
                </div>
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="Thiên Nhiên"
                extra={
                  <Button type="link" className="darkbtn">
                    Xem
                  </Button>
                }
              >
                <div
                  className="site-card-wrapper"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    // font bold
                    fontWeight: "bold",
                  }}
                >
                  "Điểm Dừng Kỷ Niệm: Gặp Lại Bạn Học Cũ Trên Đường Đời"
                </div>
              </Card>
            </Card>
          </Col>
        </Col>
      </Row>
      <Form.Item
        // wrapperCol={{ offset: 8, span: 16 }}
        style={{
          // giữ nguyên trên màn hình
          // position: "fixed",
          // bottom: "0",
          // width: "100%",
          backgroundColor: "white",
          padding: "20px",
          margin: "20px",
          border: "1px solid #e9e9e9",
          borderRadius: "5px",
        }}
      >
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditSchool;
