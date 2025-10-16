import { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import type { ItemData } from '../components/ItemCard';
import { PlayCircle, Rss, UserCheck, Paperclip } from 'lucide-react';

const Home = () => {
  const [items, setItems] = useState<ItemData[]>([]);

  useEffect(() => {
    const dummyData: ItemData[] = [
        { id: 1, category: "Kunci Motor", title: "Kunci Motor Honda Vario", location: "Kantin Fakultas Teknik", date: "27 September 2025", status: "Ditemukan", imageUrl: "https://www.hondacengkareng.com/wp-content/uploads/2023/01/35012K59A11-SET-SW-ASSY-SHUTTER-KEY-GAMBAR.jpg"},
        { id: 2, category: "Tumbler", title: "Tumbler Corkcicle Hitam", location: "Perpustakaan Pusat, Lt. 2", date: "26 September 2025", status: "Hilang", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppaKjAtEcsyHzt-9NNLeFgtabepXtjY96nQ&s"},
        { id: 3, category: "Elektronik", title: "Charger Laptop Type-C", location: "Gedung A, Ruang 301", date: "25 September 2025", status: "Ditemukan", imageUrl: "https://placehold.co/600x400/3b82f6/FFFFFF?text=Elektronik" }
    ];
    setItems(dummyData);
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-16 px-6 bg-[radial-gradient(circle_at_top_left,_#f3f7ff_0%,_#eef2ff_35%,_#ffffff_100%)] overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 flex justify-center mb-10 md:mb-0 relative min-h-[400px]">
              <img
                    src="/public/shape1.png"
                    alt="Decorative background shape"
                    className="absolute w-[1600px] md:w-[2000px] h-auto transform opacity-85"

              />
              <img 
                src="/kotak.png" 
                alt="Refind hero illustration" 
                className="w-[600px] object-contain drop-shadow-xl"
              />
            </div>
            <div className="md:w-1/2 md:pl-10 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-4 text-gray-900">Welcome to Refind!</h1>
              <p className="text-lg text-gray-600 mb-6">
                Refind is a web-based platform specifically designed to help students find or report lost items on campus.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* FEATURES SECTION */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
           <div className="bg-blue-600 text-white p-8 md:p-12 rounded-3xl">
             <h2 className="text-4xl font-bold mb-12 text-left">At ReFind, you can...</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* Card 1 */}
                 <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg transform transition-transform hover:-translate-y-2 relative">
                     <Paperclip size={20} className="absolute top-4 right-4 text-gray-300 transform rotate-12" />
                     <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-5">
                       <PlayCircle className="w-8 h-8 text-blue-600"/>
                     </div>
                     <h3 className="font-semibold text-xl mb-2">Easily search for lost items</h3>
                     <p className="text-sm text-gray-600">Through the search and category features.</p>
                 </div>
                 {/* Card 2 */}
                 <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg transform transition-transform hover:-translate-y-2 relative">
                      <Paperclip size={20} className="absolute top-4 right-4 text-gray-300 transform rotate-12" />
                     <div className="bg-yellow-100 w-16 h-16 rounded-lg flex items-center justify-center mb-5">
                       <Rss className="w-8 h-8 text-yellow-600"/>
                     </div>
                     <h3 className="font-semibold text-xl mb-2">Report found items</h3>
                     <p className="text-sm text-gray-600">So that their owners can be notified immediately.</p>
                 </div>
                 {/* Card 3 */}
                 <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg transform transition-transform hover:-translate-y-2 relative">
                      <Paperclip size={20} className="absolute top-4 right-4 text-gray-300 transform rotate-12" />
                     <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-5">
                       <UserCheck className="w-8 h-8 text-blue-600"/>
                     </div>
                     <h3 className="font-semibold text-xl mb-2">Build a caring community</h3>
                     <p className="text-sm text-gray-600">And supportive campus environment.</p>
                 </div>
             </div>
           </div>
       </div>
      </section>


      {/* FIND ITEMS SECTION */}
      <section className="relative bg-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
       
        </div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Find Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => (
              <ItemCard 
                key={item.id}
                id={item.id}
                category={item.category}
                title={item.title}
                location={item.location}
                date={item.date}
                status={item.status}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;