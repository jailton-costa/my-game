"use client";
import Animacao from '@/app/comp/Animacao'
import Link from "next/link";

export default function page() {


  return (
    <div className="relative w-full h-screen text-white">
      <Animacao />
      <div className="absolute inset-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 gap-10">
        <h1 className='text-5xl border-b-1 pb-4'><p className='letraPula'>Edgewake</p></h1>
        <p className=" text-center text-lg italic text-gray-300 max-w-sm">
          Você ja esta no Limites mais você ainda pode ir alem,	Você desperta no limite.
        </p>

        <Link
          href="/telas"
          className="botaoPadrao "
        ><p className="crescerTexto">
            Pressione qualquer botão
          </p>
        </Link>


      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400 z-10 select-none">
        © Desenvolvido por Jailton Costa Pereira
      </div>
    </div>
  );
}
