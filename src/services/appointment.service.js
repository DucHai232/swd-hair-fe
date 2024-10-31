import { axiosInstance } from "./api.service";

export const createBookingAppointment = async (payload) => {
  try {
    const response = await axiosInstance.post(`/create-appointment`, payload);
    return response;
  } catch (error) {
    console.log("Error creating appointment: ", error);
    throw error;
  }
};

export const getAppointments = async () => {
  try {
    const response = await axiosInstance.get(`/get-appointments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const approveAppointment = async (appointmentId) => {
  try {
    const response = await axiosInstance.put(`/approve/${appointmentId}`);
    return response.data; // Assuming the response returns the updated appointment
  } catch (error) {
    console.error("Error approving appointment:", error);
    throw error;
  }
};

// Service function to reject an appointment
export const rejectAppointment = async (appointmentId) => {
  try {
    const response = await axiosInstance.put(`/reject/${appointmentId}`);
    return response.data; // Assuming the response returns the updated appointment
  } catch (error) {
    console.error("Error rejecting appointment:", error);
    throw error;
  }
};

// Service function to mark an appointment as completed
export const completeAppointment = async (appointmentId) => {
  try {
    const response = await axiosInstance.put(`/completed/${appointmentId}`);
    return response.data; // Assuming the response returns the updated appointment
  } catch (error) {
    console.error("Error completing appointment:", error);
    throw error;
  }
};
