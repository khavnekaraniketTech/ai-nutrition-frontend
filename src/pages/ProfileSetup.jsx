import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function ProfileSetup({ onPlanGenerated }) {
  const [profile, setProfile] = useState({ name: '', age: '', gender: 'Male', height: '', weight: '', dietPreference: 'Vegetarian', goal: 'Maintain Weight' });
  const [loading, setLoading] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://ai-nutrition-backend-007a.onrender.com/api/plans/generate', profile);
      onPlanGenerated(res.data);
    } catch (err) {
      alert("Error generating the plan.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-10 mt-6">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white flex items-center gap-2">
          <Sparkles className="text-emerald-400" /> AI NUTRITION 
        </h2>
      </div>
      <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Name</label>
          <input type="text" required className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" onChange={e => setProfile({...profile, name: e.target.value})}/>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Age</label>
          <input type="number" required className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" onChange={e => setProfile({...profile, age: e.target.value})}/>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Gender</label>
          <select className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" onChange={e => setProfile({...profile, gender: e.target.value})}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Height (cm)</label>
            <input type="number" required className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" onChange={e => setProfile({...profile, height: e.target.value})}/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Weight (kg)</label>
            <input type="number" required className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" onChange={e => setProfile({...profile, weight: e.target.value})}/>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Diet</label>
          <select className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" onChange={e => setProfile({...profile, dietPreference: e.target.value})}>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Eggetarian</option>
            <option>Non-Vegetarian</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Goal</label>
          <select className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" onChange={e => setProfile({...profile, goal: e.target.value})}>
            <option>Maintain Weight</option>
            <option>Weight Loss</option>
            <option>Weight Gain</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="sm:col-span-2 w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2">
          {loading ? "Generating..." : "Generate AI Plan"} <ChevronRight size={18} />
        </button>
      </form>
    </div>
  );
}