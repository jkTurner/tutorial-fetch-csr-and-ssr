
export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">API Fetching Methods in Next.js</h1>
      <p className="mb-6 text-gray-500">
        Learn how to fetch data using both Client-Side Rendering (CSR) and Server-Side Rendering (SSR) in Next.js. These are foundational methods to understand how data flows between your frontend and external APIs.
      </p>

      <ul className="space-y-2">
        <li>
          <a
            href="/fetch-csr"
            className="text-blue-600 hover:underline"
          >
            → CSR Fetching in Next.js
          </a>
        </li>
        <li>
          <a
            href="/fetch-ssr"
            className="text-blue-600 hover:underline"
          >
            → SSR Fetching in Next.js
          </a>
        </li>
      </ul>
    </main>
  );
}
