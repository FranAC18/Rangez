import React, { useMemo, useState } from 'react';
import { SIZE_MEASUREMENTS } from '../data/catalog';

export const SizeGuideSection: React.FC = () => {
  const [measurement, setMeasurement] = useState('');

  const recommendedSize = useMemo(() => {
    const value = Number.parseFloat(measurement);
    if (!Number.isFinite(value) || value <= 0) return null;

    return SIZE_MEASUREMENTS.reduce((closest, row) =>
      Math.abs(row.waistWidthCm - value) < Math.abs(closest.waistWidthCm - value) ? row : closest
    );
  }, [measurement]);

  return (
    <section id="tallas" className="bg-[#efede8] px-6 py-20 text-[#171614] sm:py-24">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center sm:mb-14">
          <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-[#77726c]">
            ENCUENTRA TU TALLA
          </p>
          <h2 className="font-editorial text-3xl font-bold sm:text-5xl">
            Guía de Tallas — Bootcut
          </h2>
          <p className="mt-3 font-editorial text-sm italic text-[#6c6760]">
            Medidas tomadas en cm sobre la prenda extendida.
          </p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center font-editorial text-sm">
            <thead>
              <tr className="border-b border-[#aaa59e] text-[8px] uppercase tracking-[0.2em] text-[#77726c]">
                <th className="px-3 pb-3 font-normal">Talla</th>
                <th className="px-3 pb-3 font-normal">Ancho (cm)</th>
                <th className="px-3 pb-3 font-normal">Largo (cm)</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_MEASUREMENTS.map((row) => {
                const isRecommended = recommendedSize?.size === row.size;
                return (
                  <tr
                    key={row.size}
                    className={`border-b border-[#d4d0c9] transition-colors ${isRecommended ? 'bg-[#e3dfd8]' : ''}`}
                  >
                    <td className="px-3 py-3">{row.size}</td>
                    <td className="px-3 py-3">{row.waistWidthCm}</td>
                    <td className="px-3 py-3">{row.lengthCm}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center font-editorial text-[12px] italic leading-[1.75] text-[#605b55]">
          ¿Cómo saber tu talla? Agarra una cinta métrica y un pantalón tuyo que te quede bien. Mide de punta a punta de la cadera, de costura a costura. Compara ese número con la columna “Ancho” de la tabla; la medida más cercana es tu talla de Bootcut.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col items-center justify-center gap-3 border-t border-[#d4d0c9] pt-5 text-center sm:flex-row sm:text-left">
          <label htmlFor="ancho-jean" className="text-[9px] uppercase tracking-[0.15em] text-[#77726c]">
            Tu medida de ancho
          </label>
          <div className="flex items-center gap-2">
            <input
              id="ancho-jean"
              type="number"
              min="1"
              value={measurement}
              onChange={(event) => setMeasurement(event.target.value)}
              placeholder="cm"
              className="w-20 border-b border-[#aaa59e] bg-transparent px-2 py-1 text-center font-editorial text-sm outline-none placeholder:text-[#a29c94] focus:border-[#171614]"
            />
            {recommendedSize && (
              <p className="text-[10px] text-[#514c46]">
                Talla sugerida: <strong className="font-editorial text-base">{recommendedSize.size}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
