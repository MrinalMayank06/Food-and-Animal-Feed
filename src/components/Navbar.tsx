import React, { useState, useEffect } from 'react';
import { ShoppingBag, Globe, MapPin, TrendingUp, TrendingDown, Bell } from 'lucide-react';
import { District, TickerUpdate } from '../types';
import { BIHAR_DISTRICTS, LIVE_TICKER_UPDATES } from '../data';

interface NavbarProps {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  selectedDistrict: District;
  setSelectedDistrict: (district: District) => void;
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({
  language,
  setLanguage,
  selectedDistrict,
  setSelectedDistrict,
  cartCount,
  onCartClick,
}: NavbarProps) {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  // Rotate ticker messages smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_TICKER_UPDATES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeTicker = LIVE_TICKER_UPDATES[tickerIndex];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-100 bg-white/95 shadow-sm backdrop-blur-md">
      {/* Real-time Mandi Rate Ticker Row */}
      <div className="bg-amber-950 text-white py-2 px-4 text-xs font-medium relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="bg-amber-800 text-amber-200 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded tracking-wide shrink-0">
              {language === 'en' ? 'Live Mandi Rate' : 'लाइव मंडी भाव'}
            </span>
            
            {/* Ticker Text with animation trigger */}
            <div className="overflow-hidden relative h-5 flex-1 mx-2">
              <div 
                key={tickerIndex}
                className="absolute inset-0 truncate animate-fade-in flex items-center gap-1.5"
              >
                {activeTicker.type === 'up' && <TrendingUp className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                {activeTicker.type === 'down' && <TrendingDown className="h-3.5 w-3.5 text-rose-400 shrink-0" />}
                <span className="text-amber-50">
                  {language === 'en' ? activeTicker.messageEn : activeTicker.messageHi}
                </span>
                <span className="text-amber-400 text-[10px] shrink-0 font-mono">
                  ({activeTicker.timestamp})
                </span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-amber-200 shrink-0 text-[11px] font-mono border-l border-amber-800 pl-4 ml-2">
            <span>{language === 'en' ? 'Update Cycle: Live' : 'अपडेट चक्र: लाइव'}</span>
          </div>
        </div>
      </div>

      {/* Primary Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-amber-600/20">
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold text-amber-950 tracking-tight leading-none">
              {language === 'en' ? 'Bihar Naad & Pashu Fodder' : 'बिहार नाद एवं पशु आहार'}
            </h1>
            <p className="text-[10px] sm:text-xs text-amber-700 mt-1 font-medium font-sans">
              {language === 'en' ? 'Premium Cattle Feeding & Live Rates' : 'पशु चारा एवं सीमेंटेड नाद बाजार'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* District Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
              className="flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-amber-900 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors border border-amber-200/50"
            >
              <MapPin className="h-3.5 w-3.5 text-amber-600" />
              <span>{language === 'en' ? selectedDistrict.nameEn : selectedDistrict.nameHi}</span>
              <span className="text-[10px] font-mono text-amber-500 bg-amber-100 px-1 rounded">
                x{selectedDistrict.priceMultiplier.toFixed(2)}
              </span>
            </button>

            {showDistrictDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowDistrictDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-amber-100 rounded-xl shadow-xl z-20 py-1 overflow-hidden animate-slide-up">
                  <div className="px-3 py-1.5 bg-amber-50/50 text-[10px] font-bold text-amber-800 uppercase tracking-wider border-b border-amber-100">
                    {language === 'en' ? 'Select Bihar District' : 'बिहार का जिला चुनें'}
                  </div>
                  {BIHAR_DISTRICTS.map((district) => (
                    <button
                      key={district.id}
                      onClick={() => {
                        setSelectedDistrict(district);
                        setShowDistrictDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                        selectedDistrict.id === district.id
                          ? 'bg-amber-600 text-white'
                          : 'text-amber-950 hover:bg-amber-50'
                      }`}
                    >
                      <span>{language === 'en' ? district.nameEn : district.nameHi}</span>
                      <span className={`text-[9px] font-mono rounded px-1 ${
                        selectedDistrict.id === district.id ? 'bg-amber-700 text-amber-100' : 'bg-amber-100 text-amber-800'
                      }`}>
                        Rate x{district.priceMultiplier.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold text-amber-950 bg-white border border-amber-200 hover:bg-amber-50 transition-all rounded-lg shadow-sm"
          >
            <Globe className="h-3.5 w-3.5 text-amber-600" />
            <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={onCartClick}
            className="relative flex items-center justify-center p-2 text-amber-900 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-sm shadow-amber-600/10 h-9 w-9 sm:h-10 sm:w-10"
          >
            <ShoppingBag className="h-4 sm:h-5 sm:w-4 md:w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce-short">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
