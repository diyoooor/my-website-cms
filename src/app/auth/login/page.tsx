"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(""); // Clear any previous message

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        // If login is successful, redirect or show success message
        // In a real app, you may save tokens/cookies or set some global state
        setMessage("Login successful! Redirecting...");
        // For example, you could do:
        router.push("/dashboard");
      } else {
        // Handle non-200 responses
        const errorData = await res.json();
        setMessage(errorData.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm w-full"
      >
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>

          <button
            type="button"
            className="border-blue-600 text-white py-2 rounded border-2 hover:border-blue-700 hover:border-2"
            onClick={() => router.push('/auth/register')}
          >
            Register
          </button>
        </div>

        {message && (
          <p className="mt-2 text-center" style={{ color: "red" }}>
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
