import Link from 'next/link';
import Animacao from '@/app/comp/Animacao'

export default function NotFound() {
  return (
    <div className="min-h-screen gap-10 bg-gradient-to-br text-red-500 flex flex-col items-center justify-center px-6 text-center">
      <Animacao />
          <h1 className='text-5xl border-b-1 pb-4 text-red-500'><p className='letraPula'>😢 Erro 404 😢</p></h1>
      
      <p className="text-2xl mb-2">Oops! Você caiu num buraco negro da internet. 🌌</p>
      <p className="text-2xl mb-4">A página evaporou no espaço ou nunca existiu. 🤯</p>
      <p className="text-2xl mb-6">Mas calma, você pode voltar para um lugar seguro!</p>
      
      <Link
          href="/"
          className="botaoPadrao"
        ><p className="crescerTexto">
            Voltar para a Home antes que os aliens te encontrem 👽🚀
          </p>
        </Link>
    </div>
  );
}
