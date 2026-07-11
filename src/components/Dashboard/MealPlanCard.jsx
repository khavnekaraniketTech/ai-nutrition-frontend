import React from 'react';

export default function MealPlanCard({ meal, mealIdx, handleItemEdit }) {
  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <span className="font-extrabold text-white">{meal.mealName}</span>
        <input type="text" className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg text-xs px-3 py-1.5 outline-none text-right w-28 focus:border-emerald-500" value={meal.timing} onChange={e => handleItemEdit(mealIdx, 0, 'timing', e.target.value)} />
      </div>
      <div className="p-4 space-y-3">
        {meal.items.map((item, itemIdx) => (
          <div key={itemIdx} className="grid grid-cols-1 sm:grid-cols-5 gap-3 pb-2 sm:pb-0">
            <div className="sm:col-span-2">
              <input type="text" className="w-full bg-slate-900 border border-slate-800 p-2.5 text-sm rounded-xl text-white focus:border-emerald-500 outline-none" value={item.foodName} onChange={e => handleItemEdit(mealIdx, itemIdx, 'foodName', e.target.value)}/>
            </div>
            <div>
              <input type="text" className="w-full bg-slate-900 border border-slate-800 p-2.5 text-sm rounded-xl text-white focus:border-emerald-500 outline-none" value={item.quantity} onChange={e => handleItemEdit(mealIdx, itemIdx, 'quantity', e.target.value)}/>
            </div>
            <div>
              <input type="number" className="w-full bg-slate-900 border border-slate-800 p-2.5 text-sm rounded-xl text-white focus:border-emerald-500 outline-none" value={item.calories} onChange={e => handleItemEdit(mealIdx, itemIdx, 'calories', e.target.value)}/>
            </div>
            <div>
              <input type="number" className="w-full bg-slate-900 border border-slate-800 p-2.5 text-sm rounded-xl text-white focus:border-emerald-500 outline-none" value={item.protein} onChange={e => handleItemEdit(mealIdx, itemIdx, 'protein', e.target.value)}/>
            </div>
          </div>
        ))}
        <div className="text-right text-xs text-slate-400 pt-3 border-t border-slate-900 font-mono">
          Meal Total: <span className="text-emerald-400 font-bold">{meal.mealCalories || 0} kcal</span>
        </div>
      </div>
    </div>
  );
}