import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

export const register = (data) => axios.post(`${API_BASE_URL}/register`, data);
export const login = (data) => axios.post(`${API_BASE_URL}/login`, data);
export const createOrganizer = (data, token) =>
  axios.post(`${API_BASE_URL}/organizers`, data, { headers: { Authorization: `Bearer ${token}` } });
export const createParticipant = (data, token) =>
  axios.post(`${API_BASE_URL}/participant`, data, { headers: { Authorization: `Bearer ${token}` } });
export const getOrganizers = (token) =>
  axios.get(`${API_BASE_URL}/organizers`, { headers: { Authorization: `Bearer ${token}` } });
export const getParticipants = (token) =>
  axios.get(`${API_BASE_URL}/participants`, { headers: { Authorization: `Bearer ${token}` } });
export const getEvents = (token) =>
  axios.get(`${API_BASE_URL}/events`, { headers: { Authorization: `Bearer ${token}` } });
export const createEvent = (data, token) =>
  axios.post(`${API_BASE_URL}/event`, data, { headers: { Authorization: `Bearer ${token}` } });
export const updateEvent = (id, data, token) =>
  axios.put(`${API_BASE_URL}/events/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteEvent = (id, token) =>
  axios.delete(`${API_BASE_URL}/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const addParticipantToEvent = (eventId, participantId, token) =>
  axios.post(`${API_BASE_URL}/participants/${participantId}/register`, { eventId }, { headers: { Authorization: `Bearer ${token}` } });
export const updateOrganizer = (id, data, token) =>
  axios.put(`${API_BASE_URL}/organizers/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteOrganizer = (id, token) =>
  axios.delete(`${API_BASE_URL}/organizers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const updateParticipant = (id, data, token) =>
  axios.put(`${API_BASE_URL}/participant/${id}`, data, { headers: { Authorization: `Bearer ${token}` } }); 
export const deleteParticipant = (id, token) =>
  axios.delete(`${API_BASE_URL}/participant/${id}`, { headers: { Authorization: `Bearer ${token}` } });