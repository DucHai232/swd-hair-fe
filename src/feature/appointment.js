import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  errorMessage: '',
  appointmentId: '',
  customerId: '',
  stylistId: '',
  service: '',
  appointmentDate: '',
  visitCount: null,
  status: '',
  createdAt: '',
  updatedAt: ''
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setAppointmentId: (state, action) => {
      state.appointmentId = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setStylistId: (state, action) => {
      state.stylistId = action.payload;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    setAppointmentDate: (state, action) => {
      state.appointmentDate = action.payload;
    },
    setVisitCount: (state, action) => {
      state.visitCount = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setCreatedAt: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdatedAt: (state, action) => {
      state.updatedAt = action.payload;
    },
    setAppointmentDetails: (state, action) => {
      const {
        appointmentId,
        customerId,
        stylistId,
        service,
        appointmentDate,
        visitCount,
        status,
        createdAt,
        updatedAt
      } = action.payload;
      state.appointmentId = appointmentId;
      state.customerId = customerId;
      state.stylistId = stylistId;
      state.service = service;
      state.appointmentDate = appointmentDate;
      state.visitCount = visitCount;
      state.status = status;
      state.createdAt = createdAt;
      state.updatedAt = updatedAt;
    },
  },
});

export const {
  setError,
  setErrorMessage,
  setAppointmentId,
  setCustomerId,
  setStylistId,
  setService,
  setAppointmentDate,
  setVisitCount,
  setStatus,
  setCreatedAt,
  setUpdatedAt,
  setAppointmentDetails
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
