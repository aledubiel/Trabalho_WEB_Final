'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOng, updateOng, deleteOng, Ong } from '@/lib/ongsApi';

export default function OngDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id ? Number(params.id) : null;

  const [ong, setOng] = useState<Ong | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Omit<Ong, 'id' | 'create_at' | 'update_at'>> | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchOng = async () => {
    setLoading(true);
    setError(null);
    try {
      if (id) {
        const response = await getOng(id);
        setOng(response.data);
        setFormData({
          nome: response.data.nome,
          CNPJ: response.data.CNPJ,
          telefone: response.data.telefone,
          email: response.data.email,
        });
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError("ONG não encontrada.");
      } else {
        setError("Não foi possível carregar os dados da ONG.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOng();
  }, [id]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    setSuccessMessage(null);

    if (!formData) return;

    if (!formData.nome || !formData.CNPJ || !formData.telefone || !formData.email) {
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      await updateOng(id as number, formData);
      setSuccessMessage("ONG atualizada com sucesso!");
      setIsEditing(false);
      fetchOng();
    } catch (err: any) {
      console.error("Erro ao atualizar ONG:", err);
      setFormError("Erro ao atualizar ONG. Verifique os dados e tente novamente.");
      if (err.response && err.response.data && err.response.data.message) {
        setFormError(`Erro: ${err.response.data.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    if (window.confirm("Tem certeza que deseja excluir esta ONG?")) {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      try {
        await deleteOng(id);
        setSuccessMessage("ONG excluída com sucesso!");
        router.push('/ongs'); 
      } catch (err: any) {
        console.error("Erro ao excluir ONG:", err);
        setError("Erro ao excluir ONG. Tente novamente.");
        if (err.response && err.response.data && err.response.data.message) {
          setError(`Erro: ${err.response.data.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">Carregando dados da ONG...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Ocorreu um Erro</h2>
            <p className="text-lg text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!ong || !formData) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <p className="text-xl text-gray-600">ONG não encontrada.</p>
        </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 p-6 sm:p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {isEditing ? `Editando: ${ong.nome}` : `${ong.nome}`}
                </h1>
                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={handleUpdate} 
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                        disabled={loading}
                      >
                        {loading ? 'Salvando...' : 'Salvar'}
                      </button>
                      <button 
                        onClick={() => { setIsEditing(false); setFormError(null); setSuccessMessage(null); }} 
                        className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                        disabled={loading}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setIsEditing(true)} 
                        className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={handleDelete} 
                        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                        disabled={loading}
                      >
                        {loading ? 'Excluindo...' : 'Excluir'}
                      </button>
                      <Link href="/ongs">
                          <button className="bg-white text-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-green-100 transition-colors">
                              Voltar para ONGs
                          </button>
                      </Link>
                    </>
                  )}
                </div>
            </div>
        </div>
        
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {formError && (
            <div className="md:col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Erro!</strong>
              <span className="block sm:inline"> {formError}</span>
            </div>
          )}
          {successMessage && (
            <div className="md:col-span-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Sucesso!</strong>
              <span className="block sm:inline"> {successMessage}</span>
            </div>
          )}

          {isEditing ? (
            <>
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome || ''}
                  onChange={handleEditChange}
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
                  value={formData.CNPJ || ''}
                  onChange={handleEditChange}
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
                  value={formData.telefone || ''}
                  onChange={handleEditChange}
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
                  value={formData.email || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-semibold text-gray-500">Nome</h3>
                <p className="text-lg text-gray-800">{ong.nome}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">CNPJ</h3>
                <p className="text-lg text-gray-800">{ong.CNPJ}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Telefone</h3>
                <p className="text-lg text-gray-800">{ong.telefone}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Email</h3>
                <p className="text-lg text-gray-800">{ong.email}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
