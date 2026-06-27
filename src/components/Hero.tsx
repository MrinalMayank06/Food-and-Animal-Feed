import React from 'react';
import { Search, Info, TrendingUp, Sparkles, BookOpen } from 'lucide-react';
import { District } from '../types';

interface HeroProps {
  language: 'en' | 'hi';
  selectedDistrict: District;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function Hero({
  language,
  selectedDistrict,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}: HeroProps) {
  const categories = [
    { id: 'all', en: 'All Products', hi: 'सभी उत्पाद' },
    { id: 'troughs', en: 'Cement Naad', hi: 'नाद / नंद' },
    { id: 'fodder', en: 'Dry Fodder (Bhusa)', hi: 'सूखा चारा (भूसा)' },
    { id: 'concentrates', en: 'Chokar & Khali', hi: 'चोकर और खली' },
    { id: 'supplements', en: 'Supplements', hi: 'पूरक आहार' },
  ];

  const handleCategoryClick = (catId: string) => {
    switch (catId) {
      case 'all':
        setActiveCategory('all');
        break;
      case 'troughs':
        setActiveCategory('Feeding Troughs / नाद');
        break;
      case 'fodder':
        setActiveCategory('Dry Fodder / सूखा चारा');
        break;
      case 'concentrates':
        setActiveCategory('Concentrates / चोकर-खली');
        break;
      case 'supplements':
        setActiveCategory('Supplements / पूरक आहार');
        break;
    }
  };

  const getActiveCategoryId = () => {
    if (activeCategory === 'all') return 'all';
    if (activeCategory === 'Feeding Troughs / नाद') return 'troughs';
    if (activeCategory === 'Dry Fodder / सूखा चारा') return 'fodder';
    if (activeCategory === 'Concentrates / चोकर-खली') return 'concentrates';
    if (activeCategory === 'Supplements / पूरक आहार') return 'supplements';
    return 'all';
  };

  return (
    <div className="relative bg-gradient-to-b from-amber-50/70 to-white pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-amber-950 text-white shadow-xl mb-8">
          {/* Real Background Image representing livestock and naad */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=1200" 
              alt="Healthy cattle feeding" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Content overlay */}
          <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-16 md:max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="h-3 w-3" />
              {language === 'en' ? 'Bihar Mandi Research 2026' : 'बिहार मंडी रिसर्च 2026'}
            </span>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {language === 'en' 
                ? 'Empowering Bihar Dairy with Authentic Naad & Fodder' 
                : 'बिहार के पशुपालकों के लिए शुद्ध चारा एवं मजबूत नाद'}
            </h2>
            
            <p className="mt-3 text-sm sm:text-base text-amber-100 font-sans leading-relaxed">
              {language === 'en' 
                ? `Get real-time researched rates for ${selectedDistrict.nameEn} district. We source pure wheat Bhusa, nutritious wheat bran (Chokar), and concrete-cast Cement Naads.`
                : `आज ही ${selectedDistrict.nameHi} जिले के लाइव भाव देखें। हमारे यहाँ मिलता है उच्च गुणवत्ता का गेहूं भूसा, चोकर एवं लोहे के तारों से गूंथी मजबूत सीमेंट की नाद।`}
            </p>

            {/* Quick Bihar Stats badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 font-medium">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                <span>{language === 'en' ? 'Fodder rates monitored live' : 'लाइव मंडी भाव ट्रैकिंग'}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 font-medium">
                <BookOpen className="h-3.5 w-3.5 text-amber-300" />
                <span>{language === 'en' ? 'Expert mixing research ratios' : 'पोषण मिक्स अनुसंधान जानकारी'}</span>
              </div>
            </div>
          </div>
          
          {/* Subtle bottom gradient tab */}
          <div className="absolute bottom-0 right-0 bg-amber-600 text-[10px] sm:text-xs font-bold text-white px-4 py-1.5 rounded-tl-xl flex items-center gap-1 shadow-inner font-mono">
            <Info className="h-3 w-3 shrink-0" />
            <span>{language === 'en' ? `Prices calibrated for: ${selectedDistrict.nameEn}` : `मूल्य निर्धारित: ${selectedDistrict.nameHi}`}</span>
          </div>
        </div>

        {/* Live Search and Filter section */}
        <div className="bg-white rounded-xl shadow-md border border-amber-100 p-4 sm:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-amber-700" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'en' 
                    ? 'Search Naad, dry Bhusa, premium Chokar, Mustard Khali...' 
                    : 'नाद, सुखा भूसा, गेहूँ का चोकर, सरसो खली खोजें...'
                }
                className="block w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl bg-amber-50/25 text-amber-950 placeholder-amber-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-sm transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-amber-500 hover:text-amber-800"
                >
                  {language === 'en' ? 'Clear' : 'साफ़ करें'}
                </button>
              )}
            </div>

            {/* Quick Suggestions Helper */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 shrink-0 no-scrollbar">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wide shrink-0">
                {language === 'en' ? 'Quick Search:' : 'त्वरित खोज:'}
              </span>
              {['naad', 'bhusa', 'chokar', 'khali'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-1 bg-amber-100/50 hover:bg-amber-100 text-amber-950 text-xs rounded-full border border-amber-200/40 transition-colors font-medium cursor-pointer"
                >
                  {tag === 'naad' && (language === 'en' ? 'Naad' : 'नाद')}
                  {tag === 'bhusa' && (language === 'en' ? 'Bhusa' : 'भूसा')}
                  {tag === 'chokar' && (language === 'en' ? 'Chokar' : 'चोकर')}
                  {tag === 'khali' && (language === 'en' ? 'Khali / Oil Cake' : 'खली')}
                </button>
              ))}
            </div>

          </div>

          {/* Category Navigation Bar */}
          <div className="mt-6 pt-4 border-t border-amber-100">
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => {
                const isActive = getActiveCategoryId() === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-600/10 scale-102'
                        : 'bg-amber-50 hover:bg-amber-100 text-amber-950 hover:text-amber-900 border border-amber-200/20'
                    }`}
                  >
                    {language === 'en' ? cat.en : cat.hi}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
