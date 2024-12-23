const endpoints = {
  LOGIN: '/login',
  REGISTER: '/register',
  SEND_OTP: '/send-otp',
  VERIFY_OTP_CHANGE_PASSWORD: '/verify-otp-and-change-password',
  CREATE_APPOINTMENT: '/create-appointment',
  APPROVE_APPOINTMENT: '/approve/:appointmentId',
  REJECT_APPOINTMENT: '/reject/:appointmentId',
  CREATE_FEEDBACK: '/create-feedback',
  ADD_FAVORITE_STYLIST: '/add-favorite-stylist',
  RECOMMENDED_STYLIST: '/recommended-stylists',
  CREATE_SERVICE: '/create-service',
  VIEW_SERVICE: '/view-service',
  UPDATE_SERVICE: '/update-service',
  DELETE_SOFT_SERVICE: '/delete-soft-service',
  UPDATE_USER: '/update-user',
  GET_USER_ROLE: '/get-user-role',
  CREATE_VOUCHER: '/create-voucher',
  VIEW_VOUCHER: '/view-voucher',
  UPDATE_VOUCHER: '/update-voucher',
  DELETE_VOUCHER: '/delete-voucher',
  GET_DASHBOARD: '/get-dashboard',
  GET_STYLIST_VERIFY: '/get-stylist-verify',
  VIEW_STYLISTS: "/get-all-stylists",
  GET_ALL_STAFF: "/get-all-staff",
  SCHEDULE_STYLIST: "/schedule-stylist",
}

export default endpoints