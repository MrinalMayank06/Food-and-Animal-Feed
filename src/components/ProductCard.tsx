import React from 'react';
import { ShoppingCart, Plus, Minus, TrendingUp, TrendingDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product, District } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  district: District;
  language: 'en' | 'hi';
  onAddToCart: (prod: Product) => void;
  cartQuantity: number;
  onUpdateCartQuantity: (prodId: string, quantity: number) => void;
  onViewDetails: (prod: Product) => void;
}

export default function ProductCard({
  product,
  district,
  language,
  onAddToCart,
  cartQuantity,
  onUpdateCartQuantity,
  onViewDetails,
}: ProductCardProps) {
  // Calculate regional price
  const regionalPrice = Math.round(product.basePrice * district.priceMultiplier);
  
  // Custom relative timestamp simulated for each product
  const getRelativeUpdateTime = (id: string) => {
    switch (id) {
      case 'cement-naad-medium':
        return language === 'en' ? 'Checked 4m ago' : '4 मिनट पहले जाँचा गया';
      case 'cement-naad-large':
        return language === 'en' ? 'Refreshed 12m ago' : '12 मिनट पहले अपडेटेड';
      case 'clay-nand-small':
        return language === 'en' ? 'Updated 1h ago' : '1 घंटा पहले अपडेट किया गया';
      case 'wheat-straw-bhusa':
        return language === 'en' ? 'Live rate (2m ago)' : 'लाइव दर (2 मिनट पहले)';
      case 'wheat-bran-chokar':
        return language === 'en' ? 'Refreshed 34m ago' : '34 मिनट पहले अपडेटेड';
      case 'mustard-oil-cake':
        return language === 'en' ? 'Live rate (15m ago)' : 'लाइव दर (15 मिनट पहले)';
      case 'cattle-feed-pellets':
        return language === 'en' ? 'Updated today' : 'आज ही अपडेट किया गया';
      default:
        return language === 'en' ? 'Live rate' : 'लाइव रेट';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Product Image & Trend Badge */}
      <div className="relative aspect-video sm:aspect-square w-full bg-amber-50 overflow-hidden">
        <img
          src={product.image}
          alt={language === 'en' ? product.nameEn : product.nameHi}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Relative Time Stamp Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-amber-200 text-amber-950 px-2 py-1 rounded-md text-[10px] font-bold font-mono tracking-tight shadow-sm flex items-center gap-1">
          <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          {getRelativeUpdateTime(product.id)}
        </div>

        {/* Trend Indicator Badge */}
        {product.changePercentage !== 0 && (
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold shadow-sm flex items-center gap-1 ${
            product.trend === 'up' 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}>
            {product.trend === 'up' ? (
              <>
                <TrendingUp className="h-3 w-3 shrink-0" />
                <span>+{product.changePercentage}%</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3 shrink-0" />
                <span>{product.changePercentage}%</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[10px] font-bold tracking-wider text-amber-700 uppercase">
            {language === 'en' ? product.categoryEn : product.categoryHi}
          </span>
          
          {/* Name */}
          <h3 className="text-sm sm:text-base font-bold text-amber-950 mt-1 line-clamp-1">
            {language === 'en' ? product.nameEn : product.nameHi}
          </h3>

          {/* Description */}
          <p className="text-xs text-amber-800/80 mt-1 line-clamp-2 font-sans">
            {language === 'en' ? product.descriptionEn : product.descriptionHi}
          </p>

          {/* Nutritional / Capacity Fact tag */}
          <div className="mt-2.5 px-2 py-1.5 bg-amber-50/50 rounded-lg text-[10.5px] font-medium text-amber-900 flex items-start gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span className="line-clamp-1">
              {language === 'en' ? product.nutritionEn : product.nutritionHi}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-amber-50">
          
          {/* Price Layout */}
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[10px] text-amber-600 font-medium">
                {language === 'en' ? `${district.nameEn} Mandi Rate` : `${district.nameHi} मंडी दर`}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-amber-950">₹{regionalPrice}</span>
                <span className="text-xs text-amber-700/80">
                  {language === 'en' ? `/${product.unitEn.split(' ').slice(1).join(' ') || 'pc'}` : `/${product.unitHi.split(' ').slice(1).join(' ') || 'पीस'}`}
                </span>
              </div>
            </div>

            {/* Base Reference Helper */}
            {district.priceMultiplier !== 1 && (
              <span className="text-[9px] font-mono text-amber-500/80 bg-amber-50 px-1 py-0.5 rounded">
                Base: ₹{product.basePrice}
              </span>
            )}
          </div>

          {/* Actions button */}
          <div className="mt-4 flex gap-2">
            
            {/* View Details button */}
            <button
              onClick={() => onViewDetails(product)}
              className="px-2.5 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors flex items-center justify-center gap-1 border border-amber-200/20"
            >
              <span>{language === 'en' ? 'Details' : 'विवरण'}</span>
              <ArrowRight className="h-3 w-3" />
            </button>

            {/* Cart Button or Quantity Controls */}
            {cartQuantity === 0 ? (
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>{language === 'en' ? 'Add to Cart' : 'थैले में डालें'}</span>
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-between border border-amber-300 rounded-lg bg-amber-50/50 p-0.5">
                <button
                  onClick={() => onUpdateCartQuantity(product.id, cartQuantity - 1)}
                  className="h-7 w-7 bg-white hover:bg-amber-100 text-amber-950 rounded flex items-center justify-center font-bold transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-xs font-black text-amber-950 px-2">{cartQuantity}</span>
                <button
                  onClick={() => onUpdateCartQuantity(product.id, cartQuantity + 1)}
                  className="h-7 w-7 bg-white hover:bg-amber-100 text-amber-950 rounded flex items-center justify-center font-bold transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
