
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h1 className="text-5xl font-black text-gray-900 mb-4">Ticket Management System</h1>
      <p className="text-gray-600 mb-8 max-w-md">Manage your support tickets .</p>
      
      <Link 
        href="/dashboard" 
        className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
