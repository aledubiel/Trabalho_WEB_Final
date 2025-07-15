'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUsuario, Usuario } from '@/lib/usuariosApi';
import { getOngs, Ong } from '@/lib/ongsApi';  

type NewUsuarioFormData = Omit<Usuario, 'id' | 'ong' | 'create_at' | 'update_at'> & {
  idOng: number | null;
  senha: string; 
};

export default function NewUsuarioPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<NewUsuarioFormData>({
    nome: '',
    email: '',
    senha: '',
    idOng: null,
  });
  const [ongs, setOngs] = useState<Ong[]>([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchOngs = async () => {
      try {
        const response = await getOngs();
        if (Array.isArray(response.data)) {
          setOngs(response.data);
        } else {
          console.error("Erro: A API de ONGs não retornou um array.", response.data);
          setFormError("Não foi possível carregar as ONGs para seleção.");
          setOngs([]);
        }
      } catch (err) {
        console.error("Erro ao carregar ONGs:", err);
        setFormError("Não foi possível carregar as ONGs para seleção. Verifique a conexão com a API.");
        setOngs([]);
      }
    };
    fetchOngs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'idOng' ? (value === '' ? null : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    setSuccessMessage(null);

    if (!formData.nome || !formData.email || !formData.senha) {
      setFormError("Por favor, preencha todos os campos obrigatórios (Nome, Email, Senha).");
      setLoading(false);
      return;
    }
    
    if (formData.idOng !== null && isNaN(formData.idOng)) {
      setFormError("Por favor, selecione uma ONG válida ou deixe em branco.");
      setLoading(false);
      return;
    }

    try {
      await createUsuario(formData);
      setSuccessMessage("Usuário cadastrado com sucesso!");
      setFormData({
        nome: '',
        email: '',
        senha: '',
        idOng: null,
      });
      router.push('/usuarios');
    } catch (err: any) {
      console.error("Erro ao cadastrar usuário:", err);
      setFormError("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Novo Usuário</h1>
          <Link href="/usuarios">
            <button className="bg-gray-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-sm">
              Voltar para Usuários
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

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="idOng" className="block text-sm font-medium text-gray-700 mb-1">ONG</label>
            <select
              id="idOng"
              name="idOng"
              value={formData.idOng === null ? '' : formData.idOng}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Nenhuma ONG</option>
              {ongs.map((ong) => (
                <option key={ong.id} value={ong.id}>
                  {ong.nome}
                </option>
              ))}
            </select>
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
            {loading ? 'Cadastrando...' : 'Cadastrar Usuário'}
          </button>
        </form>
      </div>
    </main>
  );
}
