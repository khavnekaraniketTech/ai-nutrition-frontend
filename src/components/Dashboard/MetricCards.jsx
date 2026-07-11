import React from 'react';
import { Scale, Flame, Apple, Leaf } from 'lucide-react';

export default function MetricCards({ profile, dailyTotals }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center">
        <Scale size={20} className="text-emerald-400 mx-auto mb-2" />
        <span className="text-[10px] uppercase font-bold text-slate-400">Ideal Weight (IBW)</span>
        <p className="text-2xl font-black text-emerald-400 mt-1">{profile.ibw} kg</p>
      </div>
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center">
        <Flame size={20} className="text-orange-400 mx-auto mb-2" />
        <span className="text-[10px] uppercase font-bold text-slate-400">Calories</span>
        <p className="text-2xl font-black text-white mt-1">{dailyTotals.calories} kcal</p>
      </div>
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center">
        <Apple size={20} className="text-blue-400 mx-auto mb-2" />
        <span className="text-[10px] uppercase font-bold text-slate-400">Protein</span>
        <p className="text-2xl font-black text-blue-400 mt-1">{dailyTotals.protein}g</p>
      </div>
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center">
        <Leaf size={20} className="text-amber-400 mx-auto mb-2" />
        <span className="text-[10px] uppercase font-bold text-slate-400">Fat</span>
        <p className="text-2xl font-black text-amber-500 mt-1">{dailyTotals.fat}g</p>
      </div>
    </div>
  );
}