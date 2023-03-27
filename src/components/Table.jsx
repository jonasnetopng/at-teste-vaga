import React, { useState } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/all';

export function Table({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = 25;
  const [totalPages, setTotalPages] = useState(Math.ceil(data.length / maxPage));
  const TableData = data.slice((currentPage - 1) * maxPage, currentPage * maxPage);

  const backPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <table className="table w-3/4 text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Identificador</th>
              <th className="px-4 py-2">UASG</th>
              <th className="px-4 py-2">N. Avisos de Licitações</th>
              <th className="px-4 py-2">Fornecedor</th>
            </tr>
          </thead>
          <tbody>
            {TableData.map((data) => (
              <tr key={data.identificador}>
                <td className="border px-4 py-2">{data.identificador}</td>
                <td className="border px-4 py-2">{data.uasg}</td>
                <td className="border px-4 py-2">{data.numero_aviso_licitacao}</td>
                <td className="border px-4 py-2">
                  {data._links.fornecedor?.href ? (
                    <a href={`http://compras.dados.gov.br${data._links.fornecedor.href}`}>
                      {data._links.fornecedor.title}
                    </a>
                  ) : (
                    <span>Nenhum fornecedor encontrado</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      <div className="flex justify-end mt-4 mb-4">
        <button
          className="bg-gray-300 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-l"
          onClick={backPage}
        >
          <GrFormPrevious className="h-5 w-5" />
        </button>
        <span className="bg-gray-200 py-2 px-4 border border-gray-300">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="bg-gray-300 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-r"
          onClick={nextPage}
        >
          <GrFormNext className="h-5 w-5" />
        </button>
      </div>
      </div>
    </>
  );
}
