import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  X, 
  Phone, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Check, 
  Clock, 
  Truck, 
  Scale, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  RefreshCw,
  Calendar,
  Award,
  Calculator,
  TrendingUp,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';

import { Product, District, CartItem } from './types';
import { BIHAR_DISTRICTS, BIHAR_PRODUCTS } from './data';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import LiveCalculator from './components/LiveCalculator';
import ResearchPanel from './components/ResearchPanel';

// Importing new modular animal husbandry and scientific guides pages
import SeasonalFeeding from './components/SeasonalFeeding';
import AnimalSpecialty from './components/AnimalSpecialty';
import QualityEstimator from './components/QualityEstimator';
import FeedScheduler from './components/FeedScheduler';
import MandiAnalytics from './components/MandiAnalytics';
import PashuChopal from './components/PashuChopal';
import EmergencyVet from './components/EmergencyVet';

export default function App() {
  // Empathy: Default to Hindi 'hi' as the user wrote "typescirpot nhi react pe banana" in Hinglish
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');
  const [selectedDistrict, setSelectedDistrict] = useState<District>(BIHAR_DISTRICTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePage, setActivePage] = useState<'shop' | 'seasonal' | 'specialty' | 'estimator' | 'scheduler' | 'analytics' | 'chopal' | 'emergency'>('shop');
  
  // Cart & Modals
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);
  
  // Checkout Form
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [deliveryDistance, setDeliveryDistance] = useState<number>(10);
  const [orderId, setOrderId] = useState<string>('');

  // Audio Broadcasting Voice Speech
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Initialize browser speech synthesis if available
  const handlePlayAudioReport = () => {
    if (isAudioPlaying) {
      window.speechSynthesis.cancel();
      setIsAudioPlaying(false);
      return;
    }

    const bhusaPrice = Math.round(BIHAR_PRODUCTS[3].basePrice * selectedDistrict.priceMultiplier);
    const chokarPrice = Math.round(BIHAR_PRODUCTS[4].basePrice * selectedDistrict.priceMultiplier);
    const naadPrice = Math.round(BIHAR_PRODUCTS[0].basePrice * selectedDistrict.priceMultiplier);

    let utteranceText = '';
    let voiceLang = 'hi-IN';

    if (language === 'hi') {
      utteranceText = `राम राम किसान भाइयों! बिहार नाद और पशु आहार मार्केट में आपका स्वागत है। आज ${selectedDistrict.nameHi} जिले के लिए लाइव मंडी भाव इस प्रकार है: गेहूँ का शुद्ध पीला भूसा ${bhusaPrice} रुपये प्रति क्विंटल चल रहा है। दुधारू पशुओं के लिए उत्तम गेहूँ का चोकर ${chokarPrice} रुपये प्रति बोरी है। सीमेंटेड मजबूत नाद ${naadPrice} रुपये प्रति पीस है। आज ही आर्डर करें और अपने पशुओं को भरपूर पोषण दें। धन्यवाद।`;
    } else {
      utteranceText = `Hello dairy farmers! Welcome to Bihar Naad and Livestock Fodder Market. Today's live prices for ${selectedDistrict.nameEn} are: pure golden wheat straw at ${bhusaPrice} rupees per quintal. Premium nutritious wheat bran chokar is trading at ${chokarPrice} rupees per fifty kilogram bag. Cement Naad is available starting from ${naadPrice} rupees. Order today for free delivery. Thank you.`;
      voiceLang = 'en-IN';
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(utteranceText);
      utterance.lang = voiceLang;
      utterance.rate = 0.9; // speak slightly slower for clarity

      utterance.onend = () => {
        setIsAudioPlaying(false);
      };

      utterance.onerror = () => {
        setIsAudioPlaying(false);
      };

      setIsAudioPlaying(true);
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback if SpeechSynthesis is blocked or not available in iframe
      setIsAudioPlaying(true);
      setTimeout(() => setIsAudioPlaying(false), 5000);
    }
  };

  // Clean up speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Filter Products
  const filteredProducts = BIHAR_PRODUCTS.filter((prod) => {
    const matchesSearch = 
      prod.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.nameHi.includes(searchQuery) ||
      prod.categoryEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.categoryHi.includes(searchQuery) ||
      prod.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.descriptionHi.includes(searchQuery);

    const matchesCategory = 
      activeCategory === 'all' || 
      prod.categoryEn === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Cart Handlers
  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prevCart, { product, quantity: qty }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Total Calculations
  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => {
      const regionalPrice = Math.round(item.product.basePrice * selectedDistrict.priceMultiplier);
      return sum + regionalPrice * item.quantity;
    }, 0);
  };

  const getCartWeightText = () => {
    let bags = 0;
    let quintals = 0;
    let pieces = 0;

    cart.forEach((item) => {
      if (item.product.id.includes('naad') || item.product.id.includes('nand')) {
        pieces += item.quantity;
      } else if (item.product.unitEn.includes('quintal')) {
        quintals += item.quantity;
      } else {
        bags += item.quantity;
      }
    });

    const parts = [];
    if (pieces > 0) parts.push(language === 'en' ? `${pieces} Naad Troughs` : `${pieces} पीस नाद`);
    if (quintals > 0) parts.push(language === 'en' ? `${quintals} Qtl Bhusa` : `${quintals} क्विंटल भूसा`);
    if (bags > 0) parts.push(language === 'en' ? `${bags} Feed Bags` : `${bags} बोरी आहार`);

    return parts.join(' + ') || (language === 'en' ? '0 kg' : '0 किग्रा');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert(language === 'en' ? 'Please fill out all fields!' : 'कृपया सभी विवरण भरें!');
      return;
    }

    const randomId = 'BH-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setCheckoutSuccess(true);
    setCart([]);
  };

  const closeCheckoutSuccess = () => {
    setCheckoutSuccess(false);
    setIsCartOpen(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200">
      
      {/* 1. Brand Navigation */}
      <Navbar 
        language={language}
        setLanguage={setLanguage}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* 2. Banner and Search Category Filter */}
      <Hero 
        language={language}
        selectedDistrict={selectedDistrict}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Main Content Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* 8-Tab Scientific Portal Navigation Bar */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white border border-stone-200/80 p-2 shadow-sm">
          <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 px-1 no-scrollbar scroll-smooth">
            {[
              { id: 'shop', en: 'Mandi Shop', hi: 'मंडी बाजार', icon: ShoppingBag },
              { id: 'seasonal', en: 'Seasonal Care', hi: 'ऋतु अनुसार देखभाल', icon: Calendar },
              { id: 'specialty', en: 'Breed Specialty', hi: 'पशु ज्ञान विज्ञान', icon: Award },
              { id: 'estimator', en: 'Quality Checker', hi: 'चारा शुद्धता जाँच', icon: ShieldCheck },
              { id: 'scheduler', en: 'Ration Calculator', hi: 'संतुलित राशन चार्ट', icon: Calculator },
              { id: 'analytics', en: 'Mandi Rates', hi: 'मंडी मूल्य चार्ट', icon: TrendingUp },
              { id: 'chopal', en: 'Chopal Forum', hi: 'पशुपालक चौपाल', icon: MessageSquare },
              { id: 'emergency', en: 'Emergency Vet', hi: 'पशु एम्बुलेंस / इलाज', icon: ShieldAlert }
            ].map((tab) => {
              const IsSelected = activePage === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePage(tab.id as any)}
                  className={`px-4 py-3 rounded-xl text-xs font-bold border flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
                    IsSelected
                      ? 'bg-amber-950 text-white border-amber-950 scale-102 shadow-md shadow-amber-950/10'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <IconComponent className={`h-4 w-4 ${IsSelected ? 'text-amber-400' : 'text-stone-500'}`} />
                  <span>{language === 'en' ? tab.en : tab.hi}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Page Content Renderer */}
        {activePage === 'shop' && (
          <>
            {/* 3. Real-Time Audio Broadcast Board */}
            <div className="bg-amber-50 border-2 border-amber-200/60 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 bg-amber-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-md animate-bounce-short">
                  {isAudioPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5 leading-none">
                    <span className="flex h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    {language === 'en' ? 'Listen to Today\'s Mandi Price Audio Report' : 'सुनें आज का लाइव मंडी भाव बुलेटिन'}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-amber-800 mt-1.5 leading-relaxed font-sans">
                    {language === 'en' 
                      ? `An automated researched broadcast for ${selectedDistrict.nameEn} detailing live Bhusa, Chokar and Naad prices.`
                      : `पशुपालकों के लिए ${selectedDistrict.nameHi} जिले के सूखे चारे, चोकर और सीमेंट नाद के लाइव दामों की ऑडियो रिपोर्ट।`}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handlePlayAudioReport}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 justify-center cursor-pointer shrink-0 ${
                  isAudioPlaying 
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/10' 
                    : 'bg-amber-950 text-white hover:bg-amber-900 shadow-md shadow-amber-950/10'
                }`}
              >
                {isAudioPlaying ? (
                  <>
                    {/* CSS Sound waves visualizer */}
                    <div className="flex items-end gap-0.5 h-3">
                      <div className="w-0.5 bg-white h-2 animate-[pulse_0.8s_infinite]"></div>
                      <div className="w-0.5 bg-white h-3 animate-[pulse_0.5s_infinite]"></div>
                      <div className="w-0.5 bg-white h-1 animate-[pulse_0.7s_infinite]"></div>
                      <div className="w-0.5 bg-white h-2.5 animate-[pulse_0.6s_infinite]"></div>
                    </div>
                    <span>{language === 'en' ? 'Stop Live Audio' : 'ऑडियो बंद करें'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    <span>{language === 'en' ? 'Play Live Mandi Audio' : 'लाइव मंडी भाव सुनें'}</span>
                  </>
                )}
              </button>
            </div>

            {/* 4. Products grid & Side Info layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Products List (2 cols) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-amber-950 flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-amber-600" />
                    <span>{language === 'en' ? 'Verified Catalog' : 'सत्यापित उत्पाद सूची'}</span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">
                      {filteredProducts.length} {language === 'en' ? 'Items' : 'सामग्री'}
                    </span>
                  </h3>
                  
                  <span className="text-xs text-stone-500 flex items-center gap-1 font-mono">
                    <RefreshCw className="h-3 w-3 text-amber-600 animate-spin" />
                    {language === 'en' ? 'Rates sync: 100% Real' : 'दरें: 100% वास्तविक रिसर्च'}
                  </span>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-xl border border-stone-200 p-8 text-center">
                    <p className="text-sm font-semibold text-stone-500">
                      {language === 'en' ? 'No items match your search.' : 'आपकी खोज से मिलता कोई उत्पाद नहीं मिला।'}
                    </p>
                    <button
                      onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                      className="mt-3 text-xs text-amber-700 font-bold underline"
                    >
                      {language === 'en' ? 'Reset Search & Category' : 'खोज और श्रेणी रीसेट करें'}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        district={selectedDistrict}
                        language={language}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                        cartQuantity={cart.find((item) => item.product.id === prod.id)?.quantity || 0}
                        onUpdateCartQuantity={handleUpdateCartQuantity}
                        onViewDetails={setSelectedProduct}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Live Calculator Sidebar (1 col) */}
              <div className="space-y-6">
                <LiveCalculator 
                  language={language}
                  selectedDistrict={selectedDistrict}
                  onQuickAddToCart={handleAddToCart}
                />
                
                {/* Quick Farm Support Widget */}
                <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
                  <h4 className="text-xs font-black tracking-wider text-amber-800 uppercase mb-3">
                    {language === 'en' ? 'Local Depots & Support' : 'स्थानीय गोदाम एवं सहायता'}
                  </h4>
                  <div className="space-y-3 text-xs text-stone-700">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-stone-900">{language === 'en' ? 'Muzaffarpur Depot' : 'मुजफ्फरपुर मुख्य गोदाम'}</span>
                        <span>{language === 'en' ? 'Khabra road, bypass, Muzaffarpur, Bihar' : 'खबरा रोड, बाईपास, मुजफ्फरपुर, बिहार'}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-stone-900">{language === 'en' ? 'Begusarai Flour Hub' : 'बेगूसराय मिल स्टेशन'}</span>
                        <span>{language === 'en' ? 'NH-31, Near Barauni Refinery Junction, Bihar' : 'NH-31, बरौनी रिफाइनरी जंक्शन के पास, बिहार'}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span className="font-semibold text-amber-950">{language === 'en' ? 'Farmer Helpdesk:' : 'किसान हेल्पलाइन:'}</span>
                      <a href="tel:+916200000000" className="flex items-center gap-1 font-bold text-amber-600 hover:underline">
                        <Phone className="h-3.5 w-3.5" />
                        <span>+91 6200 123 456</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* 5. Fodder mix Research Panel */}
            <ResearchPanel language={language} />
          </>
        )}

        {/* Dynamic Care Pages Integration */}
        {activePage === 'seasonal' && <SeasonalFeeding language={language} />}
        {activePage === 'specialty' && <AnimalSpecialty language={language} />}
        {activePage === 'estimator' && <QualityEstimator language={language} />}
        {activePage === 'scheduler' && <FeedScheduler language={language} />}
        {activePage === 'analytics' && <MandiAnalytics language={language} />}
        {activePage === 'chopal' && <PashuChopal language={language} />}
        {activePage === 'emergency' && <EmergencyVet language={language} />}
      </main>

      {/* 6. Product Details Dialog Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative z-10 animate-slide-up border border-stone-100">
            {/* Header close */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-stone-100 hover:bg-stone-200 text-stone-900 h-8 w-8 rounded-full flex items-center justify-center transition-colors z-20"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Image */}
            <div className="aspect-video w-full bg-amber-50 overflow-hidden relative">
              <img
                src={selectedProduct.image}
                alt={language === 'en' ? selectedProduct.nameEn : selectedProduct.nameHi}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] bg-amber-600 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  {language === 'en' ? selectedProduct.categoryEn : selectedProduct.categoryHi}
                </span>
                <h3 className="text-lg font-bold mt-1">
                  {language === 'en' ? selectedProduct.nameEn : selectedProduct.nameHi}
                </h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-black tracking-wider text-stone-500 uppercase">
                  {language === 'en' ? 'Product Description' : 'उत्पाद का विवरण'}
                </h4>
                <p className="text-xs sm:text-sm text-stone-800 font-sans mt-1 leading-relaxed">
                  {language === 'en' ? selectedProduct.descriptionEn : selectedProduct.descriptionHi}
                </p>
              </div>

              {selectedProduct.nutritionEn && (
                <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100/50">
                  <h4 className="text-[11px] font-black tracking-wider text-amber-800 uppercase flex items-center gap-1">
                    <Scale className="h-3.5 w-3.5" />
                    {language === 'en' ? 'Nutrient breakdown / Capacity Metrics' : 'पोषक तत्व विश्लेषण / क्षमता मेट्रिक्स'}
                  </h4>
                  <p className="text-xs text-amber-950 font-sans mt-1 leading-relaxed">
                    {language === 'en' ? selectedProduct.nutritionEn : selectedProduct.nutritionHi}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 block">
                    {language === 'en' ? 'Estimated regional cost' : 'अनुमानित क्षेत्रीय लागत'}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-amber-950">
                      ₹{Math.round(selectedProduct.basePrice * selectedDistrict.priceMultiplier)}
                    </span>
                    <span className="text-xs text-stone-500">
                      /{language === 'en' ? selectedProduct.unitEn : selectedProduct.unitHi}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct, 1);
                    setSelectedProduct(null);
                  }}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>{language === 'en' ? 'Add To Cart' : 'थैले में डालें'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 7. Virtual Shopping Cart Sidebar / Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-fade-in border-l border-stone-100">
            
            {/* Drawer Header */}
            <div className="px-4 py-5 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-amber-600" />
                <h3 className="text-base sm:text-lg font-black text-amber-950">
                  {language === 'en' ? 'Your Feed Bag' : 'आपका पशु आहार थैला'}
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="h-8 w-8 text-stone-500 hover:text-stone-900 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="h-16 w-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {language === 'en' ? 'Fodder bag is empty!' : 'थैला अभी खाली है!'}
                  </h4>
                  <p className="text-xs text-stone-500 max-w-xs font-sans">
                    {language === 'en' 
                      ? 'Select Cement Naad or nutritious dry Bhusa fodder to build your mixture and start check out.' 
                      : 'मिश्रण बनाने के लिए अपनी पसंद की सीमेंट नाद या पौष्टिक चोकर-भूसा थैले में जोड़ें।'}
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    {language === 'en' ? 'Browse Fodder Catalog' : 'कैटलॉग देखें'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Item Blocks */}
                  {cart.map((item) => {
                    const regionalPrice = Math.round(item.product.basePrice * selectedDistrict.priceMultiplier);
                    return (
                      <div key={item.product.id} className="flex gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                        <img
                          src={item.product.image}
                          alt={language === 'en' ? item.product.nameEn : item.product.nameHi}
                          className="h-14 w-14 object-cover rounded-lg shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-amber-950 leading-tight">
                            {language === 'en' ? item.product.nameEn : item.product.nameHi}
                          </h4>
                          <span className="text-[10px] text-stone-500 font-mono mt-0.5 block">
                            ₹{regionalPrice} × {item.quantity}
                          </span>
                          
                          {/* Controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 border border-stone-300 rounded bg-white p-0.5">
                              <button
                                onClick={() => handleUpdateCartQuantity(item.product.id, item.quantity - 1)}
                                className="h-5 w-5 flex items-center justify-center text-xs font-bold hover:bg-stone-100 rounded"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold px-1">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateCartQuantity(item.product.id, item.quantity + 1)}
                                className="h-5 w-5 flex items-center justify-center text-xs font-bold hover:bg-stone-100 rounded"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveFromCart(item.product.id)}
                              className="text-stone-400 hover:text-rose-600 text-[10px] flex items-center gap-0.5"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>{language === 'en' ? 'Remove' : 'हटाएं'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Summary Metric box */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100/50 space-y-1.5 text-xs text-amber-950 font-sans">
                    <div className="flex justify-between">
                      <span>{language === 'en' ? 'Total Material Weight:' : 'कुल सामग्री भार/विवरण:'}</span>
                      <span className="font-bold">{getCartWeightText()}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-amber-200/50">
                      <span>{language === 'en' ? 'Delivery District Base:' : 'डिलीवरी जिला आधार:'}</span>
                      <span className="font-bold text-amber-800">
                        {language === 'en' ? selectedDistrict.nameEn : selectedDistrict.nameHi} (Rate x{selectedDistrict.priceMultiplier})
                      </span>
                    </div>
                  </div>

                  {/* Interactive Order Placement Form */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-3 pt-4 border-t border-stone-200">
                    <span className="text-[10px] font-extrabold tracking-wider text-stone-500 uppercase block mb-1">
                      {language === 'en' ? 'FARMER DELIVERY DETAILS' : 'पशुपालक डिलीवरी विवरण'}
                    </span>
                    
                    <div>
                      <label className="block text-[10px] font-bold text-stone-700 uppercase mb-1">
                        {language === 'en' ? 'Farmer Name / डेयरी नाम' : 'किसान का नाम / डेयरी नाम'}
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={language === 'en' ? 'e.g. Ramesh Kumar' : 'जैसे: रमेश कुमार'}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-700 uppercase mb-1">
                        {language === 'en' ? 'Active Mobile Phone Number' : 'सक्रिय मोबाइल नंबर'}
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder={language === 'en' ? '10-digit number' : '10 अंकों का नंबर'}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-700 uppercase mb-1">
                        {language === 'en' ? 'Village / Post / Block Address' : 'ग्राम / पोस्ट / ब्लॉक पता'}
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder={language === 'en' ? 'Enter full address' : 'पूरा पता दर्ज करें'}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-bold text-stone-700 uppercase">
                          {language === 'en' ? 'Distance from nearest depot' : 'निकटतम डिपो से दूरी'}
                        </label>
                        <span className="text-[11px] font-mono font-bold text-amber-700">{deliveryDistance} KM</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="80"
                        value={deliveryDistance}
                        onChange={(e) => setDeliveryDistance(parseInt(e.target.value) || 2)}
                        className="w-full accent-amber-600 bg-stone-200 h-1 rounded"
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="bg-stone-50 border-t border-stone-100 p-4 space-y-3.5">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>{language === 'en' ? 'Subtotal' : 'कुल सामग्री मूल्य'}</span>
                    <span className="font-semibold text-stone-900">₹{getCartSubtotal()}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>{language === 'en' ? 'Estimated Delivery' : 'अनुमानित डिलीवरी शुल्क'}</span>
                    <span className="font-semibold text-stone-900">
                      ₹{Math.round(deliveryDistance * selectedDistrict.deliveryChargePerKm)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-stone-200 text-sm">
                    <span className="font-bold text-amber-950">
                      {language === 'en' ? 'Estimated Grand Total:' : 'अनुमानित कुल देय राशि:'}
                    </span>
                    <span className="text-xl font-black text-amber-600">
                      ₹{getCartSubtotal() + Math.round(deliveryDistance * selectedDistrict.deliveryChargePerKm)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckoutSubmit}
                  disabled={!customerName || !customerPhone || !customerAddress}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-amber-600/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="h-4 w-4" />
                  <span>{language === 'en' ? 'Book Free Delivery & Call' : 'बुक करें और डिलीवरी कॉल प्राप्त करें'}</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 8. Success Checkout Notification Dialog */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={closeCheckoutSuccess} />
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative z-10 animate-slide-up border border-stone-100 space-y-4">
            <div className="mx-auto h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-inner">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-amber-950">
                {language === 'en' ? 'Order Scheduled Successfully!' : 'ऑर्डर सफलतापूर्वक शेड्यूल्ड!'}
              </h3>
              <p className="text-xs text-emerald-800 font-semibold mt-1">
                {language === 'en' ? `Order ID: ${orderId}` : `ऑर्डर संख्या: ${orderId}`}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              {language === 'en'
                ? `Ramesh, thank you! Your feed mixture booking for ${selectedDistrict.nameEn} has been locked. Our local depot supervisor will call you on your phone ${customerPhone} within 30 minutes to confirm the GPS location and dispatch the vehicle.`
                : `${customerName} जी, आपका धन्यवाद! ${selectedDistrict.nameHi} के लिए आपका ऑर्डर सुरक्षित कर लिया गया है। हमारे गोदाम प्रभारी अगले 30 मिनट के अंदर मोबाइल नंबर ${customerPhone} पर कॉल करके सही लोकेशन सत्यापित करेंगे।`}
            </p>

            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-xs text-amber-950 font-sans flex items-start gap-2 text-left">
              <Clock className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">{language === 'en' ? 'Estimated Dispatch Time' : 'अनुमानित प्रेषण समय'}</span>
                <span>
                  {language === 'en'
                    ? `Same-day dispatch. Expected delivery within 4 to 8 hours from Muzaffarpur bypass.`
                    : `आज ही डिलीवरी। मुजफ्फरपुर बाईपास से 4 से 8 घंटे के अंदर आपके ग्राम/डेयरी फार्म पर पहुंचेगा।`}
                </span>
              </div>
            </div>

            <button
              onClick={closeCheckoutSuccess}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-600/10 cursor-pointer"
            >
              {language === 'en' ? 'Go Back to Mandi Market' : 'वापस मंडी बाजार पर जाएँ'}
            </button>
          </div>
        </div>
      )}

      {/* 9. Human Footer */}
      <footer className="bg-amber-950 text-amber-100 py-12 border-t border-amber-900 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Mission info */}
            <div>
              <h4 className="font-display font-bold text-white text-base">
                {language === 'en' ? 'Bihar Naad & Pashu Fodder' : 'बिहार नाद एवं पशु आहार मार्केट'}
              </h4>
              <p className="text-xs text-amber-200/75 mt-2.5 leading-relaxed">
                {language === 'en'
                  ? 'A local research venture providing certified concrete cement feeding troughs (Naads) and organic, highly nutritional wheat straw (Bhusa), bran (Chokar), and mustard oil cakes for premium Bihar dairies.'
                  : 'एक स्थानीय अनुसंधान उद्यम जो बिहार के डेयरी फार्मों के लिए मजबूत कंक्रीट की नाद, जैविक गेहूं भूसा, चोकर एवं उच्च-फैट सरसों की खली सीधे गोदाम दर पर प्रदान करता है।'}
              </p>
            </div>

            {/* Quality assurance */}
            <div>
              <h4 className="font-display font-bold text-white text-base">
                {language === 'en' ? 'Quality checks researched' : 'अनुसंधान एवं गुणवत्ता नियंत्रण'}
              </h4>
              <p className="text-xs text-amber-200/75 mt-2.5 leading-relaxed">
                {language === 'en'
                  ? 'Every batch of golden Bhusa undergoes moisture tests (<10%) and is completely screened for fine dust to protect the cows lungs. Our Cement Naads are cured in water tanks for 14 days before delivery.'
                  : 'हमारे यहाँ गेहूं का भूसा धूल-मुक्त छानकर तैयार किया जाता है ताकि पशु स्वस्थ रहें। हमारी बनाई सभी सीमेंटेड नाद को प्रेषण से पहले पूरे 14 दिनों तक पानी के टैंक में सींचा जाता है।'}
              </p>
            </div>

            {/* Contact links */}
            <div>
              <h4 className="font-display font-bold text-white text-base">
                {language === 'en' ? 'Direct Helpline Support' : 'सीधी हेल्पलाइन सपोर्ट'}
              </h4>
              <p className="text-xs text-amber-200/75 mt-2 leading-relaxed">
                {language === 'en' ? 'Have questions about cattle feed ratios or bulk custom naad orders?' : 'पशु आहार अनुपात या थोक कस्टम आकार की नाद के बारे में कोई सवाल है?'}
              </p>
              <div className="mt-3 space-y-2">
                <a href="tel:+916200000000" className="flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:underline">
                  <Phone className="h-4 w-4" />
                  <span>+91 6200 123 456 (9 AM - 8 PM)</span>
                </a>
                <div className="text-[11px] text-amber-200/50">
                  {language === 'en' ? 'Main Depot: Khabra bypass, Muzaffarpur, Bihar' : 'मुख्य डिपो: खबरा बाईपास, मुजफ्फरपुर, बिहार'}
                </div>
              </div>
            </div>

          </div>

          <div className="mt-10 pt-6 border-t border-amber-900 text-center text-[10px] text-amber-200/40">
            <p>© 2026 Bihar Naad & Pashu Fodder Market. All rights reserved. Crafted for rural Bihar. 🌾🥛</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
