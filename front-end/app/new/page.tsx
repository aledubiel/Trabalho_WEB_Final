'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createAnimal, Animal } from '@/lib/animaisApi';
import { getOngs, Ong } from '@/lib/ongsApi';

type NewAnimalFormData = Omit<Animal, 'id' | 'ong'> & {
  idOng: number | null; 
};

export default function NewAnimalPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<NewAnimalFormData>({
    especie: '',
    nome: '',
    data_nascimento: '',
    porte: '',
    sexo: '',
    descricao: '',
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
          setFormError("Não foi possível carregar as ONGs para seleção. Formato de dados inválido.");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    if (!formData.especie || !formData.nome || !formData.data_nascimento || !formData.porte || !formData.sexo || !formData.descricao) {
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    if (formData.idOng === null || isNaN(formData.idOng)) {
      setFormError("Por favor, selecione uma ONG válida.");
      setLoading(false);
      return;
    }

    const dataNascimentoISO = new Date(formData.data_nascimento).toISOString();

    const dataToCreate = {
      ...formData,
      data_nascimento: dataNascimentoISO,  
      idOng: formData.idOng,
    };

    try {
      await createAnimal(dataToCreate);
      setSuccessMessage("Animal cadastrado com sucesso!");
      setFormData({
        especie: '',
        nome: '',
        data_nascimento: '',
        porte: '',
        sexo: '',
        descricao: '',
        idOng: null,
      });
      router.push('/');
    } catch (err: any) {
      console.error("Erro ao cadastrar animal:", err);
      setFormError("Erro ao cadastrar animal. Verifique os dados e tente novamente.");
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Novo Animal</h1>
          <Link href="/">
            <button className="bg-gray-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-sm">
              Voltar para Animais
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
            <label htmlFor="especie" className="block text-sm font-medium text-gray-700 mb-1">Espécie</label>
            <input
              type="text"
              id="especie"
              name="especie"
              value={formData.especie}
              onChange={handleChange}
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
              value={formData.data_nascimento}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="porte" className="block text-sm font-medium text-gray-700 mb-1">Porte</label>
            <select
              id="porte"
              name="porte"
              value={formData.porte}
              onChange={handleChange}
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
              value={formData.sexo}
              onChange={handleChange}
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
              value={formData.descricao}
              onChange={handleChange}
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
              onChange={handleChange}
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
            {loading ? 'Cadastrando...' : 'Cadastrar Animal'}
          </button>
        </form>
      </div>
    </main>
  );
}
