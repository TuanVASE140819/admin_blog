// src/api/apiServices.js
import API from "./index";

//  Register
export const registerUser = async (data) => {
  try {
    const response = await API.post("/api/v1/Account/register", data);
    return response.data;
  } catch (error) {
    // console.error("Error registering user:", error);
  }
};

export const loginUser = async (data) => {
  try {
    const response = await API.post("/api/v1/Login/loginweb", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.error("Error logging in user:", error);
  }
};

export const getListSchool = async (
  tinh,
  quan,
  xa,
  captruong,
  name,
  pageNumber,
  pageSize
) => {
  try {
    const response = await API.get(
      `/api/v1/School/getSchool?tinh=${tinh}&quan=${quan}&xa=${xa}&captruong=${captruong}&name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getSchoolDetail = async (id) => {
  try {
    const response = await API.get(`/api/v1/School/getSchoolDetail?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
//apiweloveschool20240421134825.azurewebsites.net/api/v1/Account/getAccount?name=333&pageNumber=1&pageSize=10
export const getAccount = async (name, pageNumber, pageSize) => {
  try {
    const response = await API.get(
      `/api/v1/Account/getAccount?name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// https://apiweloveschool20240421134825.azurewebsites.net/api/v1/Account/getAccountDetail?id=597f2d44-2b02-4967-85cd-27df3e5dd6bd
export const getAccountDetail = async (id) => {
  try {
    const response = await API.get(`/api/v1/Account/getAccountDetail?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

///api/v1/Account/InactiveorActiveAccount
export const InactiveorActiveAccount = async (id) => {
  try {
    const response = await API.put(
      `/api/v1/Account/InactiveorActiveAccount?id=${id}`
    );
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//https://apiweloveschool20240421134825.azurewebsites.net/api/v1/Account/updateAccount
export const updateAccount = async (data) => {
  try {
    const response = await API.put(`/api/v1/Account/updateAccount`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchData = async () => {
  try {
    const response = await API.get("/path-to-resource");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// thêm các hàm khác cho POST, PUT, DELETE...

export const postData = async (data) => {
  try {
    const response = await API.post("/path-to-resource", data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const putData = async (data) => {
  try {
    const response = await API.put("/path-to-resource", data);
    return response.data;
  } catch (error) {
    console.error("Error putting data:", error);
  }
};

export const deleteData = async (id) => {
  try {
    const response = await API.delete(`/path-to-resource/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
