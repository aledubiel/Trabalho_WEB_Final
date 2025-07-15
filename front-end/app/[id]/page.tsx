'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAnimal, updateAnimal, deleteAnimal, Animal } from '@/lib/animaisApi';
import { getOngs, Ong } from '@/lib/ongsApi';

export default function AnimalDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id ? Number(params.id) : null;

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Omit<Animal, 'id' | 'ong'>> | null>(null);
  const [ongs, setOngs] = useState<Ong[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchAnimal = async () => {
    setLoading(true);
    setError(null);
    try {
      if (id) {
        const response = await getAnimal(id);
        setAnimal(response.data);
        setFormData({
          especie: response.data.especie,
          nome: response.data.nome,
          data_nascimento: response.data.data_nascimento.split('T')[0],
          porte: response.data.porte,
          sexo: response.data.sexo,
          descricao: response.data.descricao,
          idOng: response.data.idOng,
        });
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError("Animal não encontrado.");
      } else {
        setError("Não foi possível carregar os dados do animal.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOngs = async () => {
    try {
      const response = await getOngs();
      if (Array.isArray(response.data)) {
        setOngs(response.data);
      } else {
        console.error("Erro: A API de ONGs não retornou um array.", response.data);
        setError("Não foi possível carregar as ONGs para seleção.");
        setOngs([]);
      }
    } catch (err) {
      console.error("Erro ao carregar ONGs:", err);
      setError("Não foi possível carregar as ONGs para seleção. Verifique a conexão com a API.");
      setOngs([]);
    }
  };

  useEffect(() => {
    fetchAnimal();
    fetchOngs();
  }, [id]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'idOng' ? (value === '' ? null : Number(value)) : value,
    }));
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    setSuccessMessage(null);

    if (!formData) return;

    if (!formData.especie || !formData.nome || !formData.data_nascimento || !formData.porte || !formData.sexo || !formData.descricao) {
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }
    if (formData.idOng === null || isNaN(formData.idOng as number)) {
      setFormError("Por favor, selecione uma ONG válida.");
      setLoading(false);
      return;
    }

    try {
      const dataNascimentoISO = new Date(formData.data_nascimento as string).toISOString();
      
      const dataToUpdate = {
        ...formData,
        data_nascimento: dataNascimentoISO,
        idOng: formData.idOng as number,
      };

      await updateAnimal(id as number, dataToUpdate);
      setSuccessMessage("Animal atualizado com sucesso!");
      setIsEditing(false);
      fetchAnimal();
    } catch (err: any) {
      console.error("Erro ao atualizar animal:", err);
      setFormError("Erro ao atualizar animal. Verifique os dados e tente novamente.");
      if (err.response && err.response.data && err.response.data.message) {
        setFormError(`Erro: ${err.response.data.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    if (window.confirm("Tem certeza que deseja excluir este animal? Esta ação é irreversível.")) {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      try {
        await deleteAnimal(id);
        setSuccessMessage("Animal excluído com sucesso!");
        router.push('/');
      } catch (err: any) {
        console.error("Erro ao excluir animal:", err);
        setError("Erro ao excluir animal. Tente novamente.");
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
        <p className="text-xl text-gray-600">A processar...</p>
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

  if (!animal || !formData) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <p className="text-xl text-gray-600">Animal não encontrado.</p>
        </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 sm:p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {isEditing ? `Editando: ${animal.nome}` : `${animal.nome} (${animal.especie})`}
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
                      <Link href="/">
                          <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors">
                              Voltar para Animais
                          </button>
                      </Link>
                    </>
                  )}
                </div>
            </div>
            {!isEditing && (
              <p className="text-lg text-blue-200 mt-2">Porte: {animal.porte} | Sexo: {animal.sexo}</p>
            )}
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
                <label htmlFor="especie" className="block text-sm font-medium text-gray-700 mb-1">Espécie</label>
                <input
                  type="text"
                  id="especie"
                  name="especie"
                  value={formData.especie || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="data_nascimento" className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                <input
                  type="date"
                  id="data_nascimento"
                  name="data_nascimento"
                  value={formData.data_nascimento || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="porte" className="block text-sm font-medium text-gray-700 mb-1">Porte</label>
                <select
                  id="porte"
                  name="porte"
                  value={formData.porte || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione o Porte</option>
                  <option value="Pequeno">Pequeno</option>
                  <option value="Médio">Médio</option>
                  <option value="Grande">Grande</option>
                </select>
              </div>
              <div>
                <label htmlFor="sexo" className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
                <select
                  id="sexo"
                  name="sexo"
                  value={formData.sexo || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione o Sexo</option>
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                </select>
              </div>
              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao || ''}
                  onChange={handleEditChange}
                  rows={4}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="idOng" className="block text-sm font-medium text-gray-700 mb-1">ONG</label>
                <select
                  id="idOng"
                  name="idOng"
                  value={formData.idOng === null ? '' : formData.idOng}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione uma ONG</option>
                  {ongs.map((ong) => (
                    <option key={ong.id} value={ong.id}>
                      {ong.nome}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-semibold text-gray-500">Nome</h3>
                <p className="text-lg text-gray-800">{animal.nome}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Espécie</h3>
                <p className="text-lg text-gray-800">{animal.especie}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Data de Nascimento</h3>
                <p className="text-lg text-gray-800">{new Date(animal.data_nascimento).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Porte</h3>
                <p className="text-lg text-gray-800">{animal.porte}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Sexo</h3>
                <p className="text-lg text-gray-800">{animal.sexo}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Descrição</h3>
                <p className="text-lg text-gray-800">{animal.descricao}</p>
              </div>
              {animal.ong && (
                <div>
                  <h3 className="font-semibold text-gray-500">ONG</h3>
                  <p className="text-lg text-gray-800">{animal.ong.nome}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
