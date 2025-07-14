import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen gap-4 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-extrabold mb-4">😢 Erro 404 😢</h1>
      
      <p className="text-xl mb-2">Oops! Você caiu num buraco negro da internet. 🌌</p>
      <p className="text-lg mb-4">A página evaporou no espaço ou nunca existiu. 🤯</p>
      <p className="text-md mb-6 text-gray-300">Mas calma, você pode voltar para um lugar seguro!</p>
      
      <Link href="/">
        <span className="bg-yellow-400 text-black px-6 py-3 rounded font-bold shadow hover:bg-yellow-300 transition duration-300 cursor-pointer">
          Voltar para a Home antes que os aliens te encontrem 👽🚀
        </span>
      </Link>
    </div>
  );
}
