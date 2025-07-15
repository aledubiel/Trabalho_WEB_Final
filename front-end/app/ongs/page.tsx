'use client';

import { getOngs, Ong } from "@/lib/ongsApi";
import { useEffect, useState } from "react";
import Link from 'next/link'; 

export default function OngsPage() {
  const [ongs, setOngs] = useState<Ong[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllOngs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOngs();
      setOngs(response.data);
    } catch (err) {
      setError("Não foi possível carregar as ONGs. Verifique se a API está rodando e o CORS está habilitado.");
      console.error(err);
      setOngs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOngs();
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

    if (ongs.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-lg text-gray-500">Nenhuma ONG para exibir.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongs.map((ong) => (
              <div 
                key={ong.id} 
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {ong.nome}
                  </h2>
                  <div className="space-y-3 text-gray-600">
                    <p><strong>CNPJ:</strong> {ong.CNPJ}</p>
                    <p><strong>Email:</strong> {ong.email}</p>
                    <p><strong>Telefone:</strong> {ong.telefone}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href={`/ongs/${ong.id}`}>
                      <button className="w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                          Visualizar
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
      <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
              Lista de ONGs
          </h1>
          <div className="flex gap-4">
            <Link href="/">
                <button className="bg-gray-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-sm">
                    Voltar
                </button>
            </Link>
            <Link href="/ongs/new">
                <button className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm">
                    Nova ONG
                </button>
            </Link>
          </div>
      </div>

      {renderContent()}
    </div>
  );
}
