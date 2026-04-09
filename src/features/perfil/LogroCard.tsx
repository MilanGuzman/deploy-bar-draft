type LogroCardProps = {
  titulo: string;
  descripcion: string;
  icono?: string;
  desbloqueado?: boolean;
};

export default function LogroCard({
  titulo,
  descripcion,
  icono,
  desbloqueado = true,
}: LogroCardProps) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${
        desbloqueado
          ? "bg-[#1a3857] text-white"
          : "bg-[#9d9d9d] text-gray-600"
      }`}
    >
      {desbloqueado ?
      <img
        src={`src/assets/Logros/${icono}.png`}
        alt={titulo}
        className="w-25 h-25 mx-auto mb-2 rounded-lg"
      />
      :
      <img
        src={`src/assets/Logros/Locked.png`}
        alt={titulo}
        className="w-25 h-25 mx-auto mb-2 rounded-lg"
      />
      }

      <p className="text-sm font-semibold">{titulo}</p>
      <p className="text-xs mt-1 opacity-80">{descripcion}</p>
    </div>
  );
}