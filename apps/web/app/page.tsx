export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Bienvenido a LicorLink</h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <a
          href="http://localhost:4200"
          className="block w-full text-center py-3 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Ir al Catálogo (Angular)
        </a>

        <a
          href="http://localhost:5173"
          className="block w-full text-center py-3 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition"
        >
          Ir a la Coctelera (React)
        </a>

        <a
          href="http://localhost:5174"
          className="block w-full text-center py-3 rounded bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
        >
          Ir al Carrito (Vue)
        </a>
      </div>
    </main>
  );
}