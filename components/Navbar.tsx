"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="bg-white/90 backdrop-blur-md text-slate-900 p-4 sticky top-0 z-50 border-b border-slate-200 shadow-sm">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-slate-900">
                    <Image src="/logo.png" alt="Logo" width={32} height={32} />
                    Frame Launch Media
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/cinemas" className="hover:text-slate-600 transition-colors font-medium">
                        Browse Cinemas
                    </Link>
                    {session ? (
                        <div className="flex items-center gap-3">
                            {session.user?.role === "ADMIN" && (
                                <Link href="/admin" className="text-red-400 font-bold hover:underline">
                                    Admin
                                </Link>
                            )}
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-300">
                                {session.user?.image ? (
                                    <Image src={session.user.image} alt="User" fill />
                                ) : (
                                    <div className="w-full h-full bg-slate-500" />
                                )}
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-900 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn("google")}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg font-semibold transition-all shadow-sm"
                        >
                            Login with Google
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
