'use client';

import { getAnimais, Animal } from "@/lib/animaisApi";
import { useEffect, useState } from "react";
import Link from 'next/link'; 

export default function AnimaisPage() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllAnimais = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAnimais();
      setAnimais(response.data);
    } catch (err) {
      setError("Não foi possível carregar os animais. Verifique o back-end da aplicação.");
      console.error(err);
      setAnimais([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAnimais();
  }, []); 

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-600">A processar...</p>
        </div>
      );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-lg text-red-500">{error}</p>
            </div>
        );
    }

    if (animais.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-lg text-gray-500">Nenhum animal para exibir.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animais.map((animal) => (
              <div 
                key={animal.id} 
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {animal.nome} ({animal.especie})
                  </h2>
                  <div className="space-y-3 text-gray-600">
                    <p><strong>Porte:</strong> {animal.porte}</p>
                    <p><strong>Sexo:</strong> {animal.sexo}</p>
                    <p><strong>Nascimento:</strong> {new Date(animal.data_nascimento).toLocaleDateString()}</p>
                    <p><strong>Descrição:</strong> {animal.descricao}</p>
                    {animal.ong && (
                      <p><strong>ONG:</strong> {animal.ong.nome}</p>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <Link href={`/${animal.id}`}>
                      <button className="w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                          Visualizar Detalhes
                      </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-6 gap-4 md:gap-0">
          <h1 className="text-4xl font-bold text-gray-800 text-center md:text-left mb-4 md:mb-0">
              Painel Principal de Animais
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/usuarios">
                <button className="bg-purple-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-sm">
                    Usuários
                </button>
            </Link>
            <Link href="/ongs">
                <button className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-sm">
                    ONGs
                </button>
            </Link>
            <Link href="/new">
                <button className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm">
                    Novo Animal
                </button>
            </Link>
          </div>
      </div>

      {renderContent()}
    </div>
  );
}
