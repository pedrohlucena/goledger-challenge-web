import type { Metadata } from "next";
import { LoginForm } from "@/app/(client)/(auth)/login/components/loginForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fazer login - IMDp",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center pt-10 pb-6 px-4">
        <Image src="/logo.svg" alt="IMDp" width={96} height={48} className="mb-6" />

        <div className="w-full max-w-sm border border-gray-300 rounded p-6">
          <h1 className="text-2xl font-normal text-black mb-4">Fazer login</h1>
          <LoginForm />
        </div>
      </main>

      <footer className="border-t border-gray-200 py-6 flex flex-col items-center gap-y-2 text-sm text-blue-600">
        <div className="flex gap-x-4">
          <a href="#" className="hover:underline">Ajuda</a>
          <a href="#" className="hover:underline">Condições de Uso</a>
          <a href="#" className="hover:underline">Política de Privacidade</a>
        </div>
        <p className="text-gray-600 text-xs">© 2021–2026 Amazon.com, Inc. ou suas afiliadas</p>
      </footer>
    </div>
  );
}
