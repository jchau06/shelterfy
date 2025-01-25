import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div>
          <h1 className="text-5xl text-red-400">Shelterfy</h1>
          <h2 className="text-3xl text-white-400">
            Reliable Shelters, Reliable People
          </h2>
        </div>
      </div>
    </main>
  );
}
