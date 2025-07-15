'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createOng, Ong } from '@/lib/ongsApi';

type NewOngFormData = Omit<Ong, 'id' | 'create_at' | 'update_at'>;

export default function NewOngPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<NewOngFormData>({
    nome: '',
    CNPJ: '',
    telefone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    setSuccessMessage(null);

    if (!formData.nome || !formData.CNPJ || !formData.telefone || !formData.email) {
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      await createOng(formData);
      setSuccessMessage("ONG cadastrada com sucesso!");
      setFormData({
        nome: '',
        CNPJ: '',
        telefone: '',
        email: '',
      });
      router.push('/ongs');
    } catch (err: any) {
      console.error("Erro ao cadastrar ONG:", err);
      setFormError("Erro ao cadastrar ONG. Verifique os dados e tente novamente.");
      if (err.response && err.response.data && err.response.data.message) {
        setFormError(`Erro: ${err.response.data.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Nova ONG</h1>
          <Link href="/ongs">
            <button className="bg-gray-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-sm">
              Voltar para ONGs
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="CNPJ" className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
            <input
              type="text"
              id="CNPJ"
              name="CNPJ"
              value={formData.CNPJ}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Erro!</strong>
              <span className="block sm:inline"> {formError}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Sucesso!</strong>
              <span className="block sm:inline"> {successMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar ONG'}
          </button>
        </form>
      </div>
    </main>
  );
}
