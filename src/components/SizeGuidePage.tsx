import React, { useState, useEffect } from 'react';
import {
  Ruler,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Shirt,
  Info,
} from 'lucide-react';
import { AppPage } from '../types';

interface SizeGuidePageProps {
  onNavigateToCollection: (page: AppPage, filterSize?: string) => void;
}

export const SizeGuidePage: React.FC<SizeGuidePageProps> = ({
  onNavigateToCollection,
}) => {
  // Unit toggle
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeCategory, setActiveCategory] = useState<'tops' | 'dresses' | 'outerwear' | 'handbags'>('dresses');

  // Calculator state
  const [calcCategory, setCalcCategory] = useState<'dresses' | 'tops' | 'outerwear'>('dresses');
  const [heightCm, setHeightCm] = useState<number>(165);
  const [weightKg, setWeightKg] = useState<number>(60);
  const [fitPreference, setFitPreference] = useState<'slim' | 'regular' | 'oversized'>('regular');
  const [calculatedSize, setCalculatedSize] = useState<string>('M');

  // Compute recommended size dynamically
  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // BMI/Dimension based calculation
    const bmi = weightKg / Math.pow(heightCm / 100, 2);
    let baseSize = 'M';

    if (bmi < 19) {
      baseSize = 'XS';
    } else if (bmi < 22) {
      baseSize = 'S';
    } else if (bmi < 25.5) {
      baseSize = 'M';
    } else if (bmi < 29) {
      baseSize = 'L';
    } else if (bmi < 33) {
      baseSize = 'XL';
    } else {
      baseSize = '2XL';
    }

    // Adjust for fit preference
    const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
    let idx = sizes.indexOf(baseSize);

    if (fitPreference === 'slim' && idx > 0) {
      idx -= 1;
    } else if (fitPreference === 'oversized' && idx < sizes.length - 1) {
      idx += 1;
    }

    setCalculatedSize(sizes[idx]);
  };

  // Re-run the recommendation whenever an input changes. The slider and
  // fit handlers only update state, so calling handleCalculate() inside
  // them read the previous height/weight/fit and the recommendation lagged
  // one step behind the displayed inputs.
  useEffect(() => {
    handleCalculate();
  }, [heightCm, weightKg, fitPreference]);

  // Measurement charts
  const charts = {
    dresses: {
      headers: ['Size', 'US', 'UK/AU', 'Bust', 'Waist', 'Hip', 'Length'],
      rows: [
        { size: 'XS', us: '0 - 2', uk: '4 - 6', in: ['31 - 33"', '24 - 26"', '34 - 36"', '34"'], cm: ['79 - 84', '61 - 66', '86 - 91', '86'] },
        { size: 'S', us: '4 - 6', uk: '8 - 10', in: ['33 - 35"', '26 - 28"', '36 - 38"', '35"'], cm: ['84 - 89', '66 - 71', '91 - 97', '89'] },
        { size: 'M', us: '8 - 10', uk: '12 - 14', in: ['35 - 37"', '28 - 30"', '38 - 40"', '36"'], cm: ['89 - 94', '71 - 76', '97 - 102', '91'] },
        { size: 'L', us: '12 - 14', uk: '16', in: ['38 - 40"', '31 - 33"', '41 - 43"', '37"'], cm: ['97 - 102', '79 - 84', '104 - 109', '94'] },
        { size: 'XL', us: '16', uk: '18', in: ['41 - 43"', '34 - 36"', '44 - 46"', '38"'], cm: ['104 - 109', '86 - 91', '112 - 117', '97'] },
        { size: '2XL', us: '18 - 20', uk: '20 - 22', in: ['44 - 47"', '37 - 40"', '47 - 50"', '39"'], cm: ['112 - 119', '94 - 102', '119 - 127', '99'] },
      ],
    },
    tops: {
      headers: ['Size', 'US', 'Chest / Bust', 'Shoulder', 'Front Length', 'Sleeve'],
      rows: [
        { size: 'XS', us: '0 - 2', in: ['32 - 34"', '14.5"', '24.0"', '7.0"'], cm: ['81 - 86', '37', '61', '18'] },
        { size: 'S', us: '4 - 6', in: ['35 - 37"', '15.0"', '25.0"', '7.5"'], cm: ['89 - 94', '38', '63', '19'] },
        { size: 'M', us: '8 - 10', in: ['38 - 40"', '15.5"', '26.0"', '8.0"'], cm: ['97 - 102', '39', '66', '20'] },
        { size: 'L', us: '12 - 14', in: ['41 - 43"', '16.2"', '27.0"', '8.5"'], cm: ['104 - 109', '41', '69', '22'] },
        { size: 'XL', us: '16', in: ['44 - 46"', '17.0"', '28.0"', '9.0"'], cm: ['112 - 117', '43', '71', '23'] },
        { size: '2XL', us: '18 - 20', in: ['47 - 50"', '17.8"', '29.0"', '9.5"'], cm: ['119 - 127', '45', '74', '24'] },
      ],
    },
    outerwear: {
      headers: ['Size', 'US', 'Chest', 'Shoulder Width', 'Sleeve Length', 'Total Coat Length'],
      rows: [
        { size: 'XS', us: '0 - 2', in: ['36 - 38"', '15.5"', '23.5"', '39.0"'], cm: ['91 - 97', '39', '60', '99'] },
        { size: 'S', us: '4 - 6', in: ['39 - 41"', '16.0"', '24.0"', '40.0"'], cm: ['99 - 104', '41', '61', '102'] },
        { size: 'M', us: '8 - 10', in: ['42 - 44"', '16.8"', '24.5"', '41.0"'], cm: ['107 - 112', '43', '62', '104'] },
        { size: 'L', us: '12 - 14', in: ['45 - 47"', '17.5"', '25.0"', '41.5"'], cm: ['114 - 119', '44', '63', '105'] },
        { size: 'XL', us: '16', in: ['48 - 50"', '18.2"', '25.5"', '42.0"'], cm: ['122 - 127', '46', '65', '107'] },
        { size: '2XL', us: '18 - 20', in: ['51 - 54"', '19.0"', '26.0"', '42.5"'], cm: ['130 - 137', '48', '66', '108'] },
      ],
    },
    handbags: {
      headers: ['Bag Style', 'Length / Width', 'Height', 'Depth / Base', 'Handle / Strap Drop'],
      rows: [
        { size: 'Market Tote', us: 'Universal', in: ['16.5"', '13.0"', '5.5"', '10.5" Drop'], cm: ['42', '33', '14', '27 Drop'] },
        { size: 'Crescent Shoulder', us: 'Universal', in: ['11.0"', '7.5"', '3.2"', '9.0" Drop'], cm: ['28', '19', '8', '23 Drop'] },
        { size: 'Daily Crossbody', us: 'Universal', in: ['13.5"', '11.0"', '4.0"', '22.0" Max Strap'], cm: ['34', '28', '10', '56 Max'] },
      ],
    },
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#786D62] mb-6">
          <button
            onClick={() => onNavigateToCollection('home')}
            className="hover:text-[#1C1917] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#1C1917] font-semibold">Size Guide & Fit Advisor</span>
        </div>

        {/* Page Banner Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE7DC] text-[#715438] text-xs font-semibold uppercase tracking-wider mb-3">
            <Ruler className="w-3.5 h-3.5 text-[#B85D3B]" />
            <span>True-To-Fit Certified Guide</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] font-bold tracking-tight">
            Find Your Flawless Size
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#685D52] leading-relaxed">
            Every body is unique. Use our smart interactive fit calculator or reference the detailed measurement tables to shop with complete confidence.
          </p>
        </div>

        {/* --- INTERACTIVE FIT CALCULATOR SECTION --- */}
        <div className="bg-gradient-to-br from-[#F5EFE6] to-[#ECE3D5] rounded-3xl p-6 sm:p-10 border border-[#DECDBB] shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Calculator Inputs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#1C1917] text-white flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                    Smart Fit Recommender
                  </h3>
                  <p className="text-xs text-[#706456]">
                    Calculated from thousands of customer reviews and verified garment cuts.
                  </p>
                </div>
              </div>

              {/* Category Picker */}
              <div>
                <label className="block text-xs font-semibold text-[#4A4138] uppercase tracking-wider mb-2">
                  What are you shopping for?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'dresses', label: 'Dresses' },
                    { key: 'tops', label: 'Tops & Tees' },
                    { key: 'outerwear', label: 'Outerwear' },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setCalcCategory(cat.key as any)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        calcCategory === cat.key
                          ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                          : 'bg-white/80 text-[#4A4138] border-[#DECDBB] hover:bg-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Height and Weight Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Height */}
                <div className="bg-white/90 p-4 rounded-2xl border border-[#E3D6C5]">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#4A4138] mb-2">
                    <span>Height:</span>
                    <span className="text-[#1C1917] font-bold text-sm">
                      {heightCm} cm ({Math.floor(heightCm / 30.48)}&apos;{Math.round((heightCm % 30.48) / 2.54)}&quot;)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="145"
                    max="195"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-[#1C1917] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C7E70] mt-1">
                    <span>145 cm (4&apos;9&quot;)</span>
                    <span>195 cm (6&apos;5&quot;)</span>
                  </div>
                </div>

                {/* Weight */}
                <div className="bg-white/90 p-4 rounded-2xl border border-[#E3D6C5]">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#4A4138] mb-2">
                    <span>Weight:</span>
                    <span className="text-[#1C1917] font-bold text-sm">
                      {weightKg} kg ({Math.round(weightKg * 2.20462)} lbs)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="110"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-[#1C1917] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C7E70] mt-1">
                    <span>40 kg (88 lbs)</span>
                    <span>110 kg (242 lbs)</span>
                  </div>
                </div>
              </div>

              {/* Fit Preference */}
              <div>
                <label className="block text-xs font-semibold text-[#4A4138] uppercase tracking-wider mb-2">
                  How do you like your clothes to fit?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'slim', label: 'Slim / Snug', desc: 'Hugs curves' },
                    { key: 'regular', label: 'Regular / True', desc: 'Standard drape' },
                    { key: 'oversized', label: 'Relaxed / Oversized', desc: 'Roomy streetwear' },
                  ].map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setFitPreference(f.key as any)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        fitPreference === f.key
                          ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                          : 'bg-white/80 text-[#3C342C] border-[#DECDBB] hover:bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{f.label}</div>
                      <div className={`text-[10px] ${fitPreference === f.key ? 'text-[#C9BDB0]' : 'text-[#84776A]'}`}>
                        {f.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D3C2] shadow-md text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#B85D3B] mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#7D6F61]">
                Recommended Match
              </span>
              <div className="my-2">
                <span className="font-serif text-6xl font-bold text-[#1C1917]">
                  {calculatedSize}
                </span>
              </div>
              <p className="text-xs text-[#5D5246] max-w-xs mb-6">
                Based on your {heightCm}cm height and {weightKg}kg profile with a {fitPreference} fit preference, size <strong className="text-[#1C1917] font-semibold">{calculatedSize}</strong> will give you the most flattering silhouette.
              </p>

              {/* Action Buttons */}
              <div className="w-full space-y-2.5">
                <button
                  type="button"
                  onClick={() => onNavigateToCollection(calcCategory, calculatedSize)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#1C1917] hover:bg-[#332E29] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Shirt className="w-4 h-4 text-[#E5A93C]" />
                  <span>Shop All In Size {calculatedSize}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateToCollection('new-arrivals', calculatedSize)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F4ECE3] hover:bg-[#EBE2D7] text-[#423930] text-xs font-semibold transition-colors"
                >
                  View New Arrivals in Size {calculatedSize}
                </button>
              </div>

              <div className="flex items-center gap-1.5 mt-4 text-[11px] text-[#786D62]">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>94% of customers kept this recommended size</span>
              </div>
            </div>

          </div>
        </div>

        {/* --- DETAILED SIZE MEASUREMENT TABLES --- */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE3D8] shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F0EAE1] pb-6 mb-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                Detailed Garment Measurement Tables
              </h2>
              <p className="text-xs sm:text-sm text-[#706456] mt-1">
                Measurements refer to body dimensions in {unit === 'in' ? 'inches (")' : 'centimeters (cm)'}.
              </p>
            </div>

            {/* Controls: Category tabs + Unit Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Unit Switcher */}
              <div className="inline-flex rounded-xl bg-[#F2EDE5] p-1 border border-[#DFD5C7]">
                <button
                  type="button"
                  onClick={() => setUnit('in')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    unit === 'in'
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#6D6052] hover:text-black'
                  }`}
                >
                  Inches (&quot;)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    unit === 'cm'
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#6D6052] hover:text-black'
                  }`}
                >
                  Centimeters (cm)
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
            {[
              { key: 'dresses', label: '👗 Dresses' },
              { key: 'tops', label: '👚 Tops & Tees' },
              { key: 'outerwear', label: '🧥 Outerwear & Coats' },
              { key: 'handbags', label: '👜 Handbags & Accessories' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === tab.key
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'bg-[#F6F1EA] text-[#554A3F] hover:bg-[#EAE2D7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-[#EBE4D8]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F8F5EE] text-[#4A4036] font-semibold uppercase text-[11px] tracking-wider border-b border-[#EBE4D8]">
                <tr>
                  {charts[activeCategory].headers.map((h, i) => (
                    <th key={i} className="py-3.5 px-4 sm:px-6">
                      {h}
                    </th>
                  ))}
                  <th className="py-3.5 px-4 sm:px-6 text-right">Quick Shop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EDE5] text-[#2D2620]">
                {charts[activeCategory].rows.map((row: any, idx: number) => {
                  const values = unit === 'in' ? row.in : row.cm;
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-[#FAF7F2] transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#1C1917] flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#EFE8DE] flex items-center justify-center text-xs">
                          {row.size}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#736658] font-medium">
                        {row.us}
                      </td>
                      {values.map((val: string, i: number) => (
                        <td key={i} className="py-3.5 px-4 sm:px-6 font-medium">
                          {val}
                        </td>
                      ))}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            onNavigateToCollection(
                              activeCategory as any,
                              row.size === 'Universal' ? undefined : row.size
                            )
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF4ED] hover:bg-[#1C1917] hover:text-white text-[#5E4D3E] font-semibold text-xs border border-[#E3D6C5] transition-all"
                        >
                          <span>Shop {row.size}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-[#807264]">
            <Info className="w-4 h-4 text-[#B85D3B] flex-shrink-0" />
            <span>
              If you fall between sizes, we recommend sizing up for structured cotton items, or sizing down for stretch knits.
            </span>
          </div>
        </div>

        {/* --- HOW TO MEASURE GUIDE & CONFIDENCE GUARANTEES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-[#EAE3D8] shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#EFE8DD] flex items-center justify-center text-[#966336] mb-4">
              <Ruler className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-2">
              1. Bust / Chest
            </h3>
            <p className="text-xs text-[#6B5F52] leading-relaxed">
              Wrap the measuring tape comfortably around the fullest part of your bust or chest under your arms, keeping the tape horizontal across your back.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAE3D8] shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#EFE8DD] flex items-center justify-center text-[#966336] mb-4">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-2">
              2. Natural Waist
            </h3>
            <p className="text-xs text-[#6B5F52] leading-relaxed">
              Locate the narrowest contour of your waistline (typically 1 to 2 inches above the navel). Do not suck in or pull the tape too tight.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EAE3D8] shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#EFE8DD] flex items-center justify-center text-[#966336] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-2">
              3. Hips & Seat
            </h3>
            <p className="text-xs text-[#6B5F52] leading-relaxed">
              Stand with your heels together and measure around the fullest circumference of your hips and buttocks, keeping the tape level.
            </p>
          </div>
        </div>

        {/* Free Exchange Guarantee */}
        <div className="bg-[#1C1917] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold">
              Still Unsure About Sizing?
            </h4>
            <p className="text-xs sm:text-sm text-[#C4B7A9]">
              Enjoy 100% Free Size Exchanges for 30 days. No restocking fees, no paperwork.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToCollection('new-arrivals')}
            className="px-6 py-3 rounded-full bg-[#E5A93C] hover:bg-[#CF932A] text-[#1C1917] font-bold text-xs sm:text-sm transition-all shadow-md whitespace-nowrap"
          >
            Start Shopping With Confidence
          </button>
        </div>

      </div>
    </div>
  );
};
