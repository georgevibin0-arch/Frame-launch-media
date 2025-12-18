import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-white text-slate-900 py-24 px-6 text-center border-b border-slate-200">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900 max-w-5xl mx-auto leading-tight">
                    Release <span className="text-emerald-600">YOUR film</span> in <span className="text-emerald-600">REAL cinemas</span>—no distributor, no revenue-share, one flat fee.
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Pick a screen, pick a week, pay the published rent, keep every ticket rupee.
                    <br />
                    <span className="font-semibold text-slate-700 mt-2 block">(We’re the Airbnb of Indian theatres.)</span>
                </p>
                <Link
                    href="/cinemas"
                    className="bg-slate-900 hover:bg-slate-800 text-white text-lg px-10 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl inline-block"
                >
                    Browse 127 Available Screens
                </Link>
            </section>

            {/* 3-Step Strip */}
            <section className="py-16 px-6 bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8 text-center relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2"></div>

                        {[
                            { text: "Upload Censor Certificate" },
                            { text: "Choose City & Show-Times" },
                            { text: "Pay & Premiere" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center bg-slate-50 p-4">
                                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-md z-10 border-4 border-slate-50">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{item.text}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-16 bg-emerald-900 text-white text-center">
                <div className="container mx-auto px-6">
                    <p className="text-2xl md:text-4xl font-bold font-mono tracking-tight">
                        “1,137 indie screenings booked in 60 days—Gujarat to Bhopal.”
                    </p>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 text-center bg-white">
                <h2 className="text-3xl font-bold mb-8 text-slate-900">Ready to take over the box office?</h2>
                <Link
                    href="/cinemas"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl px-12 py-5 rounded-lg font-bold transition-all shadow-xl hover:shadow-2xl inline-block transform hover:-translate-y-1"
                >
                    Book My Screen in 5 Minutes
                </Link>
            </section>
        </div>
    );
}
