import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Contact } from '../components/Contact';

export default function RecoveryPage() {
  return (
    <>
      <Head>
        <title>Recobery password</title>
      </Head>
      <div className="grid justify-center">
        <div className="p-10 grid gap-4">
          <label className="grid">
            <span>Tu nueva contraseña</span>
            <input type="text" className="bg-slate-300" />
          </label>
          <button type="submit" className="bg-green-400 w-full py-2">
            Enviar
          </button>
        </div>
      </div>
    </>
  );
}
