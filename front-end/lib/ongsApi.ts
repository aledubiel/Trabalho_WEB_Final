// lib/ongsApi.ts
import axios from 'axios';

const API_BASE_URL = axios.create({
  baseURL: "http://localhost:3000/",
});;

export type Ong = {
  id: number;
  nome: string;
  CNPJ: string;
  telefone: string;
  email: string;
  create_at?: string;
  update_at?: string;
};

export const getOngs = async () => {
  return await API_BASE_URL.get<Ong[]>(`/ongs`);
};

export const getOng = async (id: number) => {
  return await API_BASE_URL.get<Ong>(`/ongs/${id}`);
};

export const createOng = async (data: Omit<Ong, 'id' | 'create_at' | 'update_at'>) => {
  return await API_BASE_URL.post<Ong>(`/ongs`, data); // Ajuste o endpoint
};

export const updateOng = async (id: number, data: Partial<Omit<Ong, 'id' | 'ong' | 'create_at' | 'update_at'>>) => {
  return await API_BASE_URL.patch<Ong>(`/ongs/${id}`, data); // Usando PATCH para atualização parcial
};

export const deleteOng = async (id: number) => {
  return await API_BASE_URL.delete(`/ongs/${id}`); // Ajuste o endpoint
};