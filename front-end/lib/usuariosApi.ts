import axios from 'axios';

const API_BASE_URL = axios.create({
  baseURL: "http://localhost:3000/",
});;

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha?: string; // Senha é opcional no frontend, especialmente para leitura/atualização
  idOng?: number | null;
  ong?: {
    nome: string;
  } | null;
  create_at?: string;
  update_at?: string;
};

export const getUsuarios = async () => {
  return await API_BASE_URL.get<Usuario[]>(`/usuarios`); // Ajuste o endpoint se for 'usuarios'
};

export const getUsuario = async (id: number) => {
  return await API_BASE_URL.get<Usuario>(`/usuarios/${id}`); // Ajuste o endpoint
};

export const createUsuario = async (data: Omit<Usuario, 'id' | 'ong' | 'create_at' | 'update_at'>) => {
  return await API_BASE_URL.post<Usuario>(`/usuarios`, data); // Ajuste o endpoint
};

export const updateUsuario = async (id: number, data: Partial<Omit<Usuario, 'id' | 'ong' | 'create_at' | 'update_at'>>) => {
  return await API_BASE_URL.patch<Usuario>(`/usuarios/${id}`, data); // Usando PATCH para atualização parcial
};

export const deleteUsuario = async (id: number) => {
  return await API_BASE_URL.delete(`/usuarios/${id}`); // Ajuste o endpoint
};