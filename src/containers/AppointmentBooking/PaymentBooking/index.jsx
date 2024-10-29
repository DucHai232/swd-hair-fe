import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Image,
  Input,
  message,
  Modal,
  Result,
  Row,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import styles from "./PaymentBooking.module.scss";
import {
  MdDiscount,
  MdOutlineDoNotDisturbOnTotalSilence,
} from "react-icons/md";
import { RiDiscountPercentFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { getVoucherUser } from "../../../services/voucher.service";
import { convertToDateString } from "../../../utils/util";
import { IoIosArrowForward } from "react-icons/io";
import { applyCoupon } from "../../../services/coupon.service";
const PaymentBooking = ({ responseAppointment, setIsPayment }) => {
  const [isPay, setIsPay] = useState(true);
  const [dataVoucher, setDataVoucher] = useState([]);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [openDiscount, setOpenDiscount] = useState(false);
  const [addedVoucher, setAddedVoucher] = useState(null);
  const [isCodeVoucher, setIsCodeVoucher] = useState(false);
  const [code, setCode] = useState(null);
  const [discountCoupon, setDiscountCoupon] = useState(0);
  // Function xử lý
  const loadVoucher = async () => {
    try {
      const response = await getVoucherUser();
      setDataVoucher(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddVoucher = (voucher) => {
    if (voucher.discountType == "percent") {
      let moneyAfterDiscount =
        (responseAppointment.totalPrice * voucher.discountPercent) / 100;
      setPriceDiscount(moneyAfterDiscount);
    } else {
      setPriceDiscount(voucher.discountMoney);
    }
    setDiscountCoupon(0);
    setAddedVoucher(voucher._id);
    setOpenDiscount(false);
    message.success(`${voucher.voucherName} đã được thêm`);
  };
  const handleApplyCoupon = async (e) => {
    if (e.key === "Enter") {
      try {
        const payload = {
          code: code,
        };
        const response = await applyCoupon(payload);
        message.success(response?.data?.message);
        setDiscountCoupon(response?.data?.data?.discount);
        setPriceDiscount(0);
        setAddedVoucher(null);
        setCode(null);
      } catch (error) {
        message.error(
          error.response?.data?.message || "Không áp dụng được mã giảm giá"
        );
      }
    }
  };
  const handleApplyVoucher = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có muốn áp dụng voucher này không?",
      okText: "Có",
      cancelText: "Không",
      onOk: () => {
        console.log("Voucher đã được áp dụng!");
      },
      onCancel: () => {
        console.log("Người dùng đã hủy bỏ việc áp dụng voucher");
      },
    });
  };
  // Function render
  const renderService = (data) => {
    return (
      <Row className={styles.mb12}>
        <Col span={4}>
          {" "}
          <Image
            width={70}
            src={
              data?.image
                ? data?.image
                : "data:image/jpeg;base64,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"
            }
          />
        </Col>
        <Col span={20}>
          <Row>
            <Col span={20} className={styles.nameService}>
              Dịch vụ nam \ {data?.name}
            </Col>
            <Col span={4} className={styles.priceService}>
              {data?.price}$
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
  const renderVoucher = (data) => {
    const isVoucherAdded = addedVoucher == data._id;
    return (
      <Card
        className={styles.cardVoucher}
        bodyStyle={{ padding: "0", width: "100%" }}
      >
        <Row className={styles.cardBody}>
          <Col
            span={4}
            className={
              data.discountType === "percent"
                ? styles.bgVoucherPercent
                : styles.bgVoucherMoney
            }
          >
            {data.discountType === "percent"
              ? data.discountPercent
              : data.discountMoney.toLocaleString()}
            {data.discountType === "percent" ? (
              <RiDiscountPercentFill />
            ) : (
              <RiMoneyDollarCircleFill />
            )}
          </Col>
          <Col span={20} className={styles.desVoucher}>
            <Row gutter={[12, 12]}>
              <Col span={6} className={styles.bgDiscount}>
                Giảm giá
              </Col>
              <Col span={18} className={styles.desTop}>
                {data.voucherName}
              </Col>
            </Row>
            <Row className={styles.expireDay} gutter={[12, 12]}>
              <Col span={14}>
                Có hiệu lực đến: {convertToDateString(data.expiryDate)}
              </Col>
              <Col span={10}>Số point quy đổi: {data.pointThreshold}</Col>
            </Row>
            <Row
              className={
                isVoucherAdded ? styles.btnDisableVoucher : styles.btnVoucher
              }
            >
              <button onClick={() => handleAddVoucher(data)}>Thêm mã</button>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  };
  const renderCalculator = () => {
    return (
      <Row className={styles.total}>
        <Col span={16}>
          <Row className={styles.flexCenter}>
            <Col
              className={styles.flexCenter}
              span={10}
              onClick={() => setOpenDiscount(true)}
            >
              <MdDiscount size={16} style={{ color: "tomato" }} />
              <span
                style={{
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "blue",
                  borderBottom: "1px solid blue",
                }}
              >
                Voucher của bạn
              </span>
            </Col>
            <Col
              style={{ cursor: "pointer" }}
              className={styles.flexCenter}
              onClick={() => setIsCodeVoucher(true)}
            >
              Nhập mã giảm giá <IoIosArrowForward size={16} />
            </Col>
          </Row>
          {isCodeVoucher && (
            <Row style={{ marginTop: "12px" }}>
              <Col span={18}>
                <Input
                  value={code}
                  placeholder="Nhập mã giảm giá"
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => handleApplyCoupon(e)}
                />
              </Col>
            </Row>
          )}
        </Col>
        <Col span={8}>
          <Row>
            <Col className={styles.flexCenter} span={14}>
              <RiMoneyDollarCircleFill size={18} style={{ color: "tomato" }} />{" "}
              <span>Thành tiền:</span>{" "}
            </Col>
            <Col span={10}>
              <span
                style={{
                  color: "red",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {responseAppointment.totalPrice}$
              </span>
            </Col>
          </Row>
          {priceDiscount !== 0 && discountCoupon === 0 && (
            <>
              <Row>
                <Col className={styles.flexCenter} span={14}>
                  <MdOutlineDoNotDisturbOnTotalSilence
                    size={18}
                    style={{ color: "tomato" }}
                  />{" "}
                  <span>Giảm giá:</span>{" "}
                </Col>
                <Col span={10}>
                  <span
                    style={{
                      color: "red",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {priceDiscount}$
                  </span>
                </Col>
              </Row>
            </>
          )}

          {discountCoupon !== 0 && (
            <>
              <Row>
                <Col className={styles.flexCenter} span={14}>
                  <MdOutlineDoNotDisturbOnTotalSilence
                    size={18}
                    style={{ color: "tomato" }}
                  />{" "}
                  <span>Giảm giá:</span>{" "}
                </Col>
                <Col span={10}>
                  <span
                    style={{
                      color: "red",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {(responseAppointment.totalPrice * discountCoupon) / 100}$
                  </span>
                </Col>
              </Row>
            </>
          )}

          {/* Phần còn lại */}
          {(priceDiscount !== 0 || discountCoupon !== 0) && (
            <Row>
              <Col className={styles.flexCenter} span={14}>
                <TbRosetteDiscountCheckFilled
                  size={18}
                  style={{ color: "tomato" }}
                />{" "}
                <span>Còn lại:</span>{" "}
              </Col>
              <Col span={10}>
                <span
                  style={{
                    color: "red",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {responseAppointment.totalPrice -
                    (priceDiscount ||
                      (responseAppointment.totalPrice * discountCoupon) / 100)}
                  $
                </span>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    );
  };
  useEffect(() => {
    loadVoucher();
  }, []);
  return (
    <>
      {isPay ? (
        <Result
          status="success"
          title="Bạn đã đặt lịch thành công!"
          subTitle="Có rất nhiều sự lựa chọn nhưng bạn đã chọn chúng tôi. Cảm ơn bạn"
          extra={[
            <>
              <Row justify={"center"}>
                <Typography.Title level={5}>
                  Mã đặt lịch: {responseAppointment.pinCode}
                </Typography.Title>
              </Row>
              <Row gutter={[12, 12]} justify={"center"}>
                <Col>
                  <Button type="primary" onClick={() => setIsPay(false)}>
                    Thanh toán
                  </Button>
                </Col>
                <Col>
                  <Button key="buy" onClick={() => setIsPayment(false)}>
                    Đặt lịch mới
                  </Button>
                </Col>
              </Row>
              ,
            </>,
          ]}
        />
      ) : (
        <>
          <Card
            className={styles.card}
            title={
              <Content style={{ padding: "6px 0" }}>
                <Row gutter={[12, 12]} className={styles.info}>
                  <Col span={2} className={styles.info}>
                    <InfoCircleOutlined style={{ fontSize: "20px" }} />
                  </Col>
                  <Col span={22}>
                    {" "}
                    <p style={{ fontSize: "20px" }}>Thông tin khách hàng</p>
                  </Col>
                </Row>
                <Row className={styles.mb12}>
                  <Col span={6} className={styles.title}>
                    Tên khách hàng:
                  </Col>
                  <Col span={18} className={styles.text}>
                    {responseAppointment.customerName}
                  </Col>
                </Row>
                <Row>
                  <Col span={6} className={styles.title}>
                    Số điện thoại:{" "}
                  </Col>
                  <Col span={18} className={styles.text}>
                    {responseAppointment.customerPhone}
                  </Col>
                </Row>
              </Content>
            }
            actions={[
              <Button
                type="danger"
                key={1}
                style={{
                  cursor:
                    discountCoupon !== 0 || priceDiscount !== 0
                      ? "pointer"
                      : "not-allowed",
                }}
                onClick={() => handleApplyVoucher()}
              >
                Áp dụng
              </Button>,
              <Button type="primary" key={2}>
                Thanh toán
              </Button>,
            ]}
            headStyle={{ borderBottom: "1px dashed tomato" }}
          >
            {responseAppointment.services.map((service) =>
              renderService(service)
            )}
            {renderCalculator()}
          </Card>
        </>
      )}
      <Drawer
        title="VOUCHER CỦA BẠN"
        placement={"right"}
        closable={false}
        onClose={() => setOpenDiscount(false)}
        open={openDiscount}
        key={"right"}
        width={500}
      >
        {dataVoucher.length === 0 ? (
          <>
            <Empty />
          </>
        ) : (
          <>{dataVoucher.map((voucher) => renderVoucher(voucher))}</>
        )}
      </Drawer>
    </>
  );
};

export default PaymentBooking;
