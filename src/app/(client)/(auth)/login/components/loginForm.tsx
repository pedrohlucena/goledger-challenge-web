"use client";

import { useActionState } from "react";
import { login } from "@/bff/auth";
import type { LoginState } from "@/bff/auth";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    login,
    undefined
  );

  return (
    <form action={formAction} className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-1">
        <label htmlFor="username" className="text-sm text-black">
          Insira um número de celular ou um endereço de e-mail
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="border border-gray-400 rounded px-3 py-2 text-sm text-black focus:outline-none focus:border-gray-600"
        />
      </div>

      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="text-sm text-black">
            Senha
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Assistência de senha
          </a>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          className="border border-gray-400 rounded px-3 py-2 text-sm text-black focus:outline-none focus:border-gray-600"
        />
      </div>

      {state?.error && (
        <p className="text-red-600 text-sm">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-accent text-black font-medium py-2 rounded-full hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer"
      >
        Fazer login
      </button>

      <div className="flex items-center gap-x-2 text-sm text-black">
        <input type="checkbox" id="keep-connected" className="cursor-pointer" />
        <label htmlFor="keep-connected" className="cursor-pointer">
          Mantenha-me conectado.
        </label>
        <a href="#" className="text-blue-600 hover:underline">
          Detalhes
        </a>
      </div>
    </form>
  );
}
