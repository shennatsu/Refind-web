import { Users, Target, HelpCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-l from-gray-200 via-blue-200 to-stone-100">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              We Didn't Reinvent The Wheel. <br />
              <span className="text-blue-600">Just ReFind.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              ReFind adalah platform yang lahir dari ide sederhana: membantu mahasiswa menemukan kembali barang berharga mereka di lingkungan kampus.
            </p>
          </div>

          {/* Kartu Fitur dalam Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kartu 1: Apa itu ReFind? */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-100 mb-6">
                <HelpCircle className="text-blue-600 w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Apa itu ReFind?</h2>
              <p className="text-gray-600 leading-relaxed flex-grow">
                ReFind adalah sebuah platform web inovatif yang dirancang khusus untuk lingkungan kampus. Kami menyediakan wadah digital bagi mahasiswa untuk melaporkan barang yang hilang atau ditemukan.
              </p>
            </div>

            {/* Kartu 2: Tujuan Kami */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-100 mb-6">
                <Target className="text-green-600 w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Tujuan Kami</h2>
              <p className="text-gray-600 leading-relaxed flex-grow">
                Misi kami sederhana: mengurangi kepanikan dan kerugian akibat kehilangan barang di area kampus dan menciptakan ekosistem yang lebih peduli serta saling membantu.
              </p>
            </div>

            {/* Kartu 3: Dibuat oleh Mahasiswa */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-yellow-100 mb-6">
                <Users className="text-yellow-600 w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Dibuat oleh Mahasiswa</h2>
              <p className="text-gray-600 leading-relaxed flex-grow">
                Platform ini lahir dari ide dan kerja keras mahasiswa UPN "Veteran" Jakarta. Kami berharap ReFind dapat menjadi solusi yang bermanfaat bagi seluruh civitas akademika.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
