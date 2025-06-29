import React from 'react';
import { Download, Clock, Users, Target, Film, Clapperboard, Camera, Volume2, Palette, Eye } from 'lucide-react';
import { StoryResult } from '../types';

interface StoryResultsProps {
  result: StoryResult;
}

export const StoryResults: React.FC<StoryResultsProps> = ({ result }) => {
  const downloadJSON = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${result.film_title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_story.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-xl border border-slate-600">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Film className="text-orange-400" size={28} />
            {result.film_title}
          </h2>
          <button
            onClick={downloadJSON}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200"
          >
            <Download size={16} />
            Export JSON
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <Clock size={16} className="text-blue-400" />
            <span>{result.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Users size={16} className="text-green-400" />
            <span>{result.target_audience}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Target size={16} className="text-purple-400" />
            <span>{result.primary_purpose}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clapperboard size={16} className="text-orange-400" />
            <span>{result.total_scenes} scenes</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-600">
        <h3 className="text-xl font-semibold text-white mb-3">Ringkasan Cerita</h3>
        <p className="text-slate-300 leading-relaxed">{result.summary}</p>
      </div>

      {/* Three-Act Structure */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-600">
        <h3 className="text-xl font-semibold text-white mb-4">Struktur Tiga Babak</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-700 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-400 mb-2">Babak 1: Setup</h4>
            <p className="text-slate-300 text-sm">{result.three_act_structure.act_1}</p>
          </div>
          <div className="p-4 bg-slate-700 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-semibold text-orange-400 mb-2">Babak 2: Konflik</h4>
            <p className="text-slate-300 text-sm">{result.three_act_structure.act_2}</p>
          </div>
          <div className="p-4 bg-slate-700 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-400 mb-2">Babak 3: Resolusi</h4>
            <p className="text-slate-300 text-sm">{result.three_act_structure.act_3}</p>
          </div>
        </div>
      </div>

      {/* Characters */}
      {result.characters && result.characters.length > 0 && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-600">
          <h3 className="text-xl font-semibold text-white mb-3">Karakter</h3>
          <div className="flex flex-wrap gap-2">
            {result.characters.map((character, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg border border-slate-600"
              >
                {character}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Custom Words Used */}
      {result.custom_words_used && result.custom_words_used.length > 0 && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-600">
          <h3 className="text-xl font-semibold text-white mb-3">Kata Kustom yang Digunakan</h3>
          <div className="flex flex-wrap gap-2">
            {result.custom_words_used.map((word, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-orange-900/30 text-orange-300 rounded-lg border border-orange-600/30"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Scenes */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-600">
        <h3 className="text-xl font-semibold text-white mb-4">Breakdown Scene</h3>
        <div className="space-y-6">
          {result.scenes.map((scene, index) => (
            <div
              key={index}
              className="p-6 bg-slate-700 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-blue-400 text-lg">
                  Scene {scene.scene_number}
                </h4>
                <span className="text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                  {scene.time_range}
                </span>
              </div>
              
              {/* Basic Scene Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 mb-1 font-medium">📍 Lokasi:</p>
                    <p className="text-white">{scene.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 mb-1 font-medium">👥 Karakter:</p>
                    <p className="text-white">{scene.characters.join(', ')}</p>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 mb-1 font-medium">🎭 Mood:</p>
                    <p className="text-slate-300">{scene.mood}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 mb-1 font-medium">🎬 Transisi:</p>
                    <p className="text-slate-300">{scene.transition}</p>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 mb-1 font-medium">📹 Kamera:</p>
                    <p className="text-slate-300">{scene.camera}</p>
                  </div>
                </div>
              </div>

              {/* Visual Description */}
              <div className="mb-6">
                <p className="text-slate-400 mb-2 font-medium flex items-center gap-2">
                  <Eye size={16} />
                  Deskripsi Visual:
                </p>
                <p className="text-slate-300 bg-slate-800 p-3 rounded-lg">{scene.visual}</p>
              </div>
              
              {/* Dialog */}
              <div className="mb-6">
                <p className="text-slate-400 mb-2 font-medium">💬 Dialog:</p>
                <div className="text-slate-300 bg-slate-800 p-3 rounded-lg italic">
                  "{scene.dialog}"
                </div>
              </div>

              {/* Cinematography Details */}
              {scene.cinematography && (
                <div className="mb-6">
                  <p className="text-slate-400 mb-3 font-medium flex items-center gap-2">
                    <Camera size={16} />
                    Detail Sinematografi:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-blue-400 text-sm font-medium">Gaya Sinematografi:</p>
                        <p className="text-slate-300 text-sm">{scene.cinematography.gaya_sinematografi}</p>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-blue-400 text-sm font-medium">Pergerakan Kamera:</p>
                        <p className="text-slate-300 text-sm">{scene.cinematography.pergerakan_kamera}</p>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-blue-400 text-sm font-medium">Sudut Kamera:</p>
                        <p className="text-slate-300 text-sm">{scene.cinematography.sudut_kamera}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-blue-400 text-sm font-medium">Panjang Fokus:</p>
                        <p className="text-slate-300 text-sm">{scene.cinematography.panjang_fokus}</p>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-blue-400 text-sm font-medium">Pencahayaan:</p>
                        <p className="text-slate-300 text-sm">{scene.cinematography.pencahayaan}</p>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-blue-400 text-sm font-medium">Gradiasi Warna:</p>
                        <p className="text-slate-300 text-sm">{scene.cinematography.gradiasi_warna}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Audio Details */}
              {scene.audio && (
                <div>
                  <p className="text-slate-400 mb-3 font-medium flex items-center gap-2">
                    <Volume2 size={16} />
                    Detail Audio:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-green-400 text-sm font-medium">Suasana Suara:</p>
                        <p className="text-slate-300 text-sm">{scene.audio.suasana_suara}</p>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-green-400 text-sm font-medium">Musik Latar:</p>
                        <p className="text-slate-300 text-sm">{scene.audio.musik_latar}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-green-400 text-sm font-medium">Efek Suara:</p>
                        <p className="text-slate-300 text-sm">{scene.audio.efek_suara}</p>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <p className="text-green-400 text-sm font-medium">Volume:</p>
                        <p className="text-slate-300 text-sm">{scene.audio.volume}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Project Details */}
      {result.project_details && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-600">
          <h3 className="text-xl font-semibold text-white mb-4">Detail Proyek</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400 mb-1">Dibuat:</p>
              <p className="text-slate-300 mb-3">
                {new Date(result.project_details.created_at).toLocaleString('id-ID')}
              </p>
              
              <p className="text-slate-400 mb-1">Estimasi Waktu Produksi:</p>
              <p className="text-slate-300">{result.project_details.estimated_production_time}</p>
            </div>
            
            <div>
              <p className="text-slate-400 mb-1">Peralatan yang Direkomendasikan:</p>
              <ul className="text-slate-300 space-y-1">
                {result.project_details.recommended_equipment.map((equipment, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    {equipment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};