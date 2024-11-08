import { Avatar, Button, Col, Input, message, Modal, Row, Spin } from "antd";
import "./CmpUser.scss";
import { useState } from "react";
import { uploadImage } from "../../services/uploadImage.service";
import {
  changePassword,
  sendOTP,
  updateUser,
} from "../../services/user.service";
import { useNavigate } from "react-router-dom";

const InfoUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [imageUrl, setImageUrl] = useState(user?.avatar);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false);
  const [isOpenOtp, setIsOpenOtp] = useState(false);
  const [formChangePassword, setFormChangePassword] = useState({
    otp: "",
    newPassword: "",
  });
  const [formData, setFormData] = useState({
    email: user?.email,
    username: user?.username,
    name: user?.name,
    phone: user?.phone,
    address: user?.address,
  });

  const navigate = useNavigate();

  const dataInfo = [
    { title: "Email", name: "email", disabled: true },
    { title: "Tên đăng nhập", name: "username", disabled: true },
    { title: "Tên của bạn", name: "name" },
    { title: "Số điện thoại", name: "phone" },
    { title: "Địa chỉ", name: "address" },
  ];

  const renderInfo = (item) => (
    <Row style={{ marginBottom: "12px" }} key={item.name}>
      <Col span={6} style={{ fontSize: "18px", fontWeight: "bold" }}>
        {item.title}
      </Col>
      <Col span={18}>
        <Input
          value={formData[item.name]}
          placeholder={item.title}
          disabled={item.disabled}
          onChange={(e) =>
            setFormData({ ...formData, [item.name]: e.target.value })
          }
        />
      </Col>
    </Row>
  );

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    if (
      !selectedFile &&
      formData.name === user?.name &&
      formData.phone === user?.phone &&
      formData.address === user?.address
    ) {
      message.warning("Không có thông tin thay đổi!");
      return;
    }

    setIsLoading(true);

    try {
      let imageUploadUrl = imageUrl;
      if (selectedFile) {
        const formData = new FormData();
        formData.append("img", selectedFile);
        const response = await uploadImage(formData);
        imageUploadUrl = response.url;
      }

      const response = await updateUser({
        avatar: imageUploadUrl,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          avatar: imageUploadUrl,
          name: response.name,
          phone: response.phone,
          address: response.address,
        })
      );

      message.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error(error);
      message.error("Cập nhật thất bại, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = () => {
    Modal.confirm({
      title: "Xác nhận đổi mật khẩu",
      content: "Bạn có chắc chắn muốn đổi mật khẩu?",
      onOk: async () => {
        try {
          await sendOTP({ email: user?.email });
          message.success("Mã OTP đã được gửi tới email của bạn!");
          setIsOpenOtp(true);
        } catch (error) {
          console.error(error);
          message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
      },
    });
  };

  const handleSubmitChange = async () => {
    try {
      setIsLoadingChangePassword(true);
      await changePassword({
        email: user?.email,
        otp: formChangePassword.otp,
        newPassword: formChangePassword.newPassword,
      });
      message.success("Đổi mật khẩu thành công!");
      setIsOpenOtp(false);
    } catch (error) {
      message.error(
        error.response.data.message || "Có lỗi xảy ra, vui lòng thử lại sau!"
      );
    } finally {
      setIsLoadingChangePassword(false);
    }
  };

  return (
    <>
      <Row>
        <Col span={8} className="container-bg">
          <h1>Quản lý tài khoản</h1>
          <Button onClick={() => navigate("/")}>Về trang chủ</Button>
        </Col>

        <Col span={16} className="container-info">
          <Spin spinning={isLoading}>
            {dataInfo.map(renderInfo)}

            <Row>
              <Col span={6}>
                <Avatar size={64} src={imageUrl} />
              </Col>
              <Col span={18}>
                <input
                  type="file"
                  className="input-file"
                  onChange={handleChangeFile}
                />
              </Col>
            </Row>

            <Row justify="center" gutter={[12, 12]}>
              <Col>
                <Button onClick={handleSendOtp}>Đổi mật khẩu</Button>
              </Col>
              <Col>
                <Button type="primary" onClick={handleUpdate}>
                  Cập nhật
                </Button>
              </Col>
            </Row>
          </Spin>
        </Col>
      </Row>

      <Modal
        open={isOpenOtp}
        title="Điền mã OTP - đổi mật khẩu"
        okText="Xác nhận"
        onCancel={() => setIsOpenOtp(false)}
        onOk={handleSubmitChange}
        loading={isLoadingChangePassword}
      >
        <Input
          value={formChangePassword.otp}
          onChange={(e) =>
            setFormChangePassword({
              ...formChangePassword,
              otp: e.target.value,
            })
          }
          placeholder="Mã OTP"
        />
        <Input.Password
          placeholder="Mật khẩu mới"
          onChange={(e) =>
            setFormChangePassword({
              ...formChangePassword,
              newPassword: e.target.value,
            })
          }
          style={{ marginTop: "12px" }}
        />
      </Modal>
    </>
  );
};

export default InfoUser;
