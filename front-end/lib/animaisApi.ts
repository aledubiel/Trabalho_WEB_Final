// lib/animaisApi.ts
import axios from 'axios';

const API_BASE_URL = axios.create({
  baseURL: "http://localhost:3000/",
});;

// Tipo para o modelo de Animal baseado no seu Prisma schema
export type Animal = {
  id: number;
  especie: string;
  nome: string;
  data_nascimento: string; // Ou Date, dependendo de como você serializa
  porte: string;
  sexo: string;
  descricao: string;
  idOng?: number | null; // Opcional, pois pode ser nulo
  ong?: { // Incluindo a ONG para exibição
    nome: string;
  } | null;
};

// Função para obter todos os animais
export const getAnimais = async () => {
  return await API_BASE_URL.get(`/animais`);
};

// Função para obter um único animal por ID
export const getAnimal = async (id: number) => {
  return await API_BASE_URL.get<Animal>(`/animais/${id}`);
};

// Função para criar um novo animal
export const createAnimal = async (data: Omit<Animal, 'id' | 'ong'>) => {
  return await API_BASE_URL.post<Animal>(`/animais`, data);
};

// Função para atualizar um animal existente
export const updateAnimal = async (id: number, data: Partial<Omit<Animal, 'id' | 'ong'>>) => {
  return await API_BASE_URL.patch<Animal>(`/animais/${id}`, data);
};

// Função para deletar um animal
export const deleteAnimal = async (id: number) => {
  return await API_BASE_URL.delete(`/animais/${id}`);
};
