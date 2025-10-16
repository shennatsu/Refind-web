import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-400">
      <div className="container mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">ReFind</h3>
            <p className="text-sm leading-relaxed">
              Platform berbasis komunitas untuk menemukan kembali barang berharga Anda di lingkungan kampus.
            </p>
          </div>

          {/* Kolom 2: Narahubung */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">NARAHUBUNG</h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-center hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>(021) 7656971</span>
              </p>
              <p className="flex items-center hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                <span>refind@upnvj.ac.id</span>
              </p>
            </div>
          </div>

          {/* Kolom 3: Find Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">FIND US</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-gray-300">Cabang Pondok Labu:</p>
                <p className="flex items-start mt-1">
                  <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                  <span> Jl. R.S Fatmawati No. 1, Cilandak, Jakarta Selatan 12450</span>
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-300">Cabang Limo:</p>
                <p className="flex items-start mt-1">
                  <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                  <span>Jl. Limo Raya No. 7, Cinere, Depok 16514</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2025 ReFind. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

