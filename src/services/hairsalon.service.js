import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './api.service';
import endpoints from '../consts/endpoint';

const hairsalonApi = createApi({
  reducerPath: 'hairsalonApi',
  baseQuery: axiosBaseQuery(), // Adjust base URL as needed
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: endpoints.LOGIN,
        method: 'POST',
        data: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: endpoints.REGISTER,
        method: 'POST',
        data: userData,
      }),
    }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: endpoints.SEND_OTP,
        method: 'POST',
        data: data,
      }),
    }),
    verifyOtpChangePassword: builder.mutation({
      query: (data) => ({
        url: endpoints.VERIFY_OTP_CHANGE_PASSWORD,
        method: 'POST',
        data: data,
      }),
    }),
    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: endpoints.CREATE_APPOINTMENT,
        method: 'POST',
        data: appointmentData,
      }),
    }),
    approveAppointment: builder.mutation({
      query: ({ appointmentId }) => ({
        url: endpoints.APPROVE_APPOINTMENT.replace(':appointmentId', appointmentId),
        method: 'PUT',
      }),
    }),
    rejectAppointment: builder.mutation({
      query: ({ appointmentId }) => ({
        url: endpoints.REJECT_APPOINTMENT.replace(':appointmentId', appointmentId),
        method: 'PUT',
      }),
    }),
    createFeedback: builder.mutation({
      query: (feedbackData) => ({
        url: endpoints.CREATE_FEEDBACK,
        method: 'POST',
        data: feedbackData,
      }),
    }),
    addFavoriteStylist: builder.mutation({
      query: (stylistData) => ({
        url: endpoints.ADD_FAVORITE_STYLIST,
        method: 'POST',
        data: stylistData,
      }),
    }),
    recommendedStylist: builder.query({
      query: () => ({
        url: endpoints.RECOMMENDED_STYLIST,
        method: 'GET',
      }),
    }),
    createService: builder.mutation({
      query: (serviceData) => ({
        url: endpoints.CREATE_SERVICE,
        method: 'POST',
        data: serviceData,
      }),
    }),
    viewService: builder.query({
      query: () => ({
        url: endpoints.VIEW_SERVICE,
        method: 'GET',
      }),
    }),
    updateService: builder.mutation({
      query: (serviceData) => ({
        url: endpoints.UPDATE_SERVICE,
        method: 'PUT',
        data: serviceData,
      }),
    }),
    deleteService: builder.mutation({
      query: (serviceId) => ({
        url: `${endpoints.DELETE_SERVICE}/${serviceId}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: endpoints.UPDATE_USER,
        method: 'PUT',
        data: userData,
      }),
    }),
    getUserRole: builder.query({
      query: () => ({
        url: endpoints.GET_USER_ROLE,
        method: 'GET',
      }),
    }),
    createVoucher: builder.mutation({
      query: (voucherData) => ({
        url: endpoints.CREATE_VOUCHER,
        method: 'POST',
        data: voucherData,
      }),
    }),
    viewVoucher: builder.query({
      query: () => ({
        url: endpoints.VIEW_VOUCHER,
        method: 'GET',
      }),
    }),
    updateVoucher: builder.mutation({
      query: (voucherData) => ({
        url: endpoints.UPDATE_VOUCHER,
        method: 'PUT',
        data: voucherData,
      }),
    }),
    deleteVoucher: builder.mutation({
      query: (voucherId) => ({
        url: `${endpoints.DELETE_VOUCHER}/${voucherId}`,
        method: 'DELETE',
      }),
    }),
    dataDashboard: builder.mutation({
      query: (date) => ({
        url: endpoints.GET_DASHBOARD,
        method: 'POST',
        data: date,
      }),
    }),
    getAllStylist: builder.query({
      query: () => ({
        url: endpoints.VIEW_STYLISTS,
        method: "GET",
      }),
    }),
    getStylistVerify: builder.query({
      query: () => ({
        url: endpoints.GET_STYLIST_VERIFY,
        method: "GET",
      }),
    }),
    deleteSoftService: builder.mutation({
      query: (serviceId) => ({
        url: endpoints.DELETE_SOFT_SERVICE,
        method: 'PUT',
        data: serviceId,
      }),
    }),
    getAllStaff: builder.query({
      query: () => ({
        url: endpoints.GET_ALL_STAFF,
        method: 'GET',
      }),
    }),
    scheduleStylist: builder.query({
      query: () => ({
        url: endpoints.SCHEDULE_STYLIST,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpChangePasswordMutation,
  useCreateAppointmentMutation,
  useApproveAppointmentMutation,
  useRejectAppointmentMutation,
  useCreateFeedbackMutation,
  useAddFavoriteStylistMutation,
  useRecommendedStylistQuery,
  useCreateServiceMutation,
  useViewServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useUpdateUserMutation,
  useGetUserRoleQuery,
  useCreateVoucherMutation,
  useViewVoucherQuery,
  useUpdateVoucherMutation,
  useDeleteVoucherMutation,
  useDataDashboardMutation,
  useGetAllStylistQuery,
  useGetStylistVerifyQuery,
  useDeleteSoftServiceMutation,
  useScheduleStylistQuery,
  useGetAllStaffQuery
} = hairsalonApi;

export default hairsalonApi;
