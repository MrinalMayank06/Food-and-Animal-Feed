import React, { useState, useEffect } from 'react';
import { Calculator, Truck, ShoppingBag, ShieldAlert, CheckCircle } from 'lucide-react';
import { Product, District } from '../types';
import { BIHAR_PRODUCTS } from '../data';

interface LiveCalculatorProps {
  language: 'en' | 'hi';
  selectedDistrict: District;
  onQuickAddToCart: (product: Product, quantity: number) => void;
}

export default function LiveCalculator({
  language,
  selectedDistrict,
  onQuickAddToCart,
}: LiveCalculatorProps) {
  const [selectedProductId, setSelectedProductId] = useState(BIHAR_PRODUCTS[3].id); // Default to Wheat Straw Bhusa
  const [amount, setAmount] = useState<number>(5); // Default 5 Quintals or pieces
  const [distance, setDistance] = useState<number>(15); // Default 15 KM delivery distance
  const [isAdded, setIsAdded] = useState(false);

  // Selected product
  const product = BIHAR_PRODUCTS.find((p) => p.id === selectedProductId) || BIHAR_PRODUCTS[3];
  
  // Calculate regional price per unit
  const regionalPricePerUnit = Math.round(product.basePrice * selectedDistrict.priceMultiplier);
  
  // Subtotal
  const subtotal = Math.round(regionalPricePerUnit * amount);
  
  // Delivery Charge
  const deliveryCharge = Math.round(distance * selectedDistrict.deliveryChargePerKm);
  
  // Total
  const total = subtotal + deliveryCharge;

  // Handle rapid state changes safely
  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const handleAddToCart = () => {
    onQuickAddToCart(product, amount);
    setIsAdded(true);
  };

  const getUnitName = () => {
    if (product.id.includes('naad') || product.id.includes('nand')) {
      return language === 'en' ? 'Pieces' : 'पीस';
    } else if (product.unitEn.includes('quintal')) {
      return language === 'en' ? 'Quintals (100 kg)' : 'क्विंटल (100 kg)';
    } else if (product.unitEn.includes('50kg')) {
      return language === 'en' ? 'Bags (50 kg)' : 'बोरी (50 kg)';
    } else {
      return language === 'en' ? 'Packs' : 'पैकेट';
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white rounded-2xl p-6 shadow-xl border border-amber-800">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-amber-800 pb-4 mb-5">
        <div className="p-2.5 bg-amber-500 rounded-lg text-white">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold leading-none">
            {language === 'en' ? 'Interactive Mandi Calculator' : 'इंटरएक्टिव मंडी कैलकुलेटर'}
          </h3>
          <p className="text-xs text-amber-300 mt-1">
            {language === 'en' ? 'Calculate total cost including regional delivery' : 'क्षेत्रीय डिलीवरी सहित कुल लागत की गणना करें'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Controls */}
        <div className="space-y-4">
          
          {/* Fodder or Naad Select */}
          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              {language === 'en' ? 'Select Product' : 'उत्पाद का चयन करें'}
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-amber-900/60 border border-amber-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {BIHAR_PRODUCTS.map((prod) => (
                <option key={prod.id} value={prod.id} className="bg-amber-950 text-white">
                  {language === 'en' ? prod.nameEn : prod.nameHi} - (₹{Math.round(prod.basePrice * selectedDistrict.priceMultiplier)}/{language === 'en' ? prod.unitEn.split(' ').slice(1).join(' ') || 'unit' : prod.unitHi.split(' ').slice(1).join(' ') || 'यूनिट'})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {language === 'en' ? 'Enter Quantity' : 'मात्रा दर्ज करें'}
              </label>
              <span className="text-xs font-bold text-amber-400 bg-amber-900 px-2 py-0.5 rounded">
                {getUnitName()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="500"
                value={amount}
                onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full bg-amber-900/60 border border-amber-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
                  className="h-9 w-9 bg-amber-800 hover:bg-amber-700 rounded-lg flex items-center justify-center text-sm font-bold active:scale-95"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setAmount((prev) => prev + 1)}
                  className="h-9 w-9 bg-amber-800 hover:bg-amber-700 rounded-lg flex items-center justify-center text-sm font-bold active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Distance */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {language === 'en' ? 'Delivery Distance' : 'डिलीवरी दूरी'}
              </label>
              <span className="text-xs font-bold text-amber-400 bg-amber-900 px-2 py-0.5 rounded">
                {distance} KM
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value) || 0)}
              className="w-full accent-amber-500 bg-amber-800 h-2 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-amber-400 font-medium mt-1">
              <span>{language === 'en' ? 'Local pickup (0 km)' : 'लोकल पिकअप (0 किमी)'}</span>
              <span>150 KM</span>
            </div>
          </div>

        </div>

        {/* Cost Estimation Breakdown Display */}
        <div className="bg-amber-950/80 rounded-xl p-5 border border-amber-800/80 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-extrabold tracking-wider text-amber-400 uppercase">
              {language === 'en' ? 'Estimated Billing Breakdown' : 'अनुमानित बिलिंग विवरण'}
            </span>

            {/* Subtotal Item Row */}
            <div className="flex justify-between text-xs py-1.5 border-b border-amber-900/50">
              <span className="text-amber-200">
                {language === 'en' ? 'Material Cost' : 'सामग्री लागत'} ({amount} × ₹{regionalPricePerUnit})
              </span>
              <span className="font-semibold text-white">₹{subtotal}</span>
            </div>

            {/* Delivery Charge Item Row */}
            <div className="flex justify-between text-xs py-1.5 border-b border-amber-900/50">
              <span className="text-amber-200 flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                {language === 'en' ? 'Delivery Charge' : 'डिलीवरी शुल्क'} ({distance} km × ₹{selectedDistrict.deliveryChargePerKm}/km)
              </span>
              <span className="font-semibold text-white">₹{deliveryCharge}</span>
            </div>

            {/* Regional Taxes/Market Fees Row */}
            <div className="flex justify-between text-xs py-1.5 border-b border-amber-900/50">
              <span className="text-amber-200">
                {language === 'en' ? 'Bihar Mandi Tax (1%)' : 'बिहार कृषि मंडी टैक्स (1%)'}
              </span>
              <span className="font-semibold text-emerald-400">{language === 'en' ? 'FREE' : 'फ्री'}</span>
            </div>

            {/* Final Cost */}
            <div className="flex justify-between items-baseline pt-3">
              <span className="text-sm font-bold text-amber-300">
                {language === 'en' ? 'Estimated Total:' : 'कुल अनुमानित मूल्य:'}
              </span>
              <span className="text-2xl font-black text-amber-400">₹{total}</span>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-amber-900 flex flex-col sm:flex-row gap-2">
            
            {/* Quick add to cart */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isAdded 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/10 active:scale-98'
              }`}
            >
              {isAdded ? (
                <>
                  <CheckCircle className="h-4 w-4 text-white animate-bounce-short" />
                  <span>{language === 'en' ? 'Added Successfully!' : 'सफलतापूर्वक जोड़ा गया!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>{language === 'en' ? 'Add Fodder to Cart' : 'थैले में जोड़ें'}</span>
                </>
              )}
            </button>

          </div>

          {/* Secure disclaimer */}
          <div className="mt-3 flex items-start gap-1.5 text-[9px] text-amber-300/80 font-sans leading-tight">
            <ShieldAlert className="h-3 w-3 shrink-0 text-amber-400 mt-0.5" />
            <span>
              {language === 'en' 
                ? '*Calculated values are based on real-time market research rates. Final weight is recorded at the physical weighing bridge (Dharmkanta).' 
                : '*कीमतें वास्तविक मंडी अनुसंधान पर आधारित हैं। अंतिम वजन धर्मकांटा पर दर्ज किया जाएगा।'}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
