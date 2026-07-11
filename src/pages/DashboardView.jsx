import React from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { Download, Save } from 'lucide-react';
import MetricCards from '../components/Dashboard/MetricCards';
import MealPlanCard from '../components/Dashboard/MealPlanCard';
import AnalysisBox from '../components/UI/AnalysisBox';

export default function DashboardView({ currentPlan, setCurrentPlan }) {
  
  const handleItemEdit = (mealIdx, itemIdx, field, val) => {
    const updatedMeals = [...currentPlan.meals];
    const targetItem = updatedMeals[mealIdx].items[itemIdx];
    
    targetItem[field] = (field === 'foodName' || field === 'quantity') ? val : Number(val);
    updatedMeals[mealIdx].mealCalories = updatedMeals[mealIdx].items.reduce((acc, i) => acc + (Number(i.calories) || 0), 0);

    const macros = { calories: 0, protein: 0, fat: 0 };
    updatedMeals.forEach(m => {
      m.items.forEach(i => {
        macros.calories += (Number(i.calories) || 0);
        macros.protein += (Number(i.protein) || 0);
        macros.fat += (Number(i.fat) || 0);
      });
    });

    setCurrentPlan({ ...currentPlan, meals: updatedMeals, dailyTotals: macros });
  };

  const handleSaveChangesDB = async () => {
    try {
      const res = await axios.put(`https://ai-nutrition-backend-007a.onrender.com/api/plans/${currentPlan._id}`, currentPlan);
      alert("Changes saved to local JSON database successfully!");
      setCurrentPlan(res.data);
    } catch (err) {
      alert("Failed to save changes.");
    }
  };

const printDocumentPDF = () => {
    const docTarget = document.getElementById('report-canvas-pane');
    
    if (!docTarget) {
      alert("Error: Canvas element not found on screen.");
      return;
    }

    // html-to-image uses the browser's native rendering engine, meaning it 
    // natively understands all modern Tailwind CSS (including oklch).
    toPng(docTarget, { 
      pixelRatio: 2, 
      backgroundColor: '#0f172a' // Tailwind slate-900 hex fallback
    })
      .then((dataUrl) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        
        // Use jsPDF's built-in image property reader
        const imgProps = pdf.getImageProperties(dataUrl);
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Auto-generate extra pages if the layout is too tall
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`AI_Nutrition_Plan_${currentPlan.profile.name.replace(/\s+/g, '_')}.pdf`);
      })
      .catch((err) => {
        console.error("html-to-image crash log: ", err);
        alert("Failed to export PDF. Check F12 console.");
      });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 mt-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white">Record: {currentPlan.profile.name}</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSaveChangesDB} className="px-4 py-2 text-xs font-bold border border-emerald-500 text-emerald-400 rounded-xl hover:bg-emerald-500/10 flex items-center gap-2">
            <Save size={14} /> Save to JSON
          </button>
          <button onClick={printDocumentPDF} className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center gap-2">
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      <div id="report-canvas-pane" className="space-y-6 bg-slate-900 p-2 rounded-xl">
        <MetricCards profile={currentPlan.profile} dailyTotals={currentPlan.dailyTotals} />
        <AnalysisBox>{currentPlan.dailySummary}</AnalysisBox>
        
        {currentPlan.meals.map((meal, mealIdx) => (
          <MealPlanCard key={mealIdx} meal={meal} mealIdx={mealIdx} handleItemEdit={handleItemEdit} />
        ))}
      </div>
    </div>
  );
}