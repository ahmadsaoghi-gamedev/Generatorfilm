import React, { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { FormData } from '../types';
import { FormInput } from './FormInput';
import { CustomWordsInput } from './CustomWordsInput';

interface StoryFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

const DURATIONS = ['1', '2', '3', '4', '5', '7'];
const GENRES = [
  'Komedi', 'Drama', 'Aksi', 'Horor', 'Romantis', 'Thriller', 'Petualangan',
  'Sci-Fi', 'Fantasi', 'Dokumenter', 'Animasi', 'Musikal', 'Kriminal', 'Keluarga'
];
const LANGUAGES = ['Indonesian', 'English', 'Javanese', 'Sundanese', 'Balinese', 'Malay'];
const TARGET_AUDIENCES = [
  'Anak-anak (5-12)', 'Remaja (13-17)', 'Dewasa Muda (18-25)', 
  'Dewasa (26-40)', 'Paruh Baya (41-55)', 'Lansia (55+)', 'Semua Umur'
];
const PRIMARY_PURPOSES = [
  'Hiburan', 'Edukasi', 'Marketing/Iklan', 'Kesadaran Sosial',
  'Pelatihan/Tutorial', 'Personal/Keluarga', 'Seni/Ekspresi', 'Presentasi Bisnis'
];
const MAIN_CONFLICTS = [
  'Orang vs Orang', 'Orang vs Diri Sendiri', 'Orang vs Alam', 'Orang vs Masyarakat',
  'Orang vs Teknologi', 'Orang vs Takdir', 'Orang vs Supernatural', 'Orang vs Waktu'
];
const MOOD_TONES = [
  'Lucu/Ringan', 'Serius/Dramatis', 'Menegangkan/Tegang', 'Romantis/Emosional',
  'Gelap/Misterius', 'Mengangkat/Inspiratif', 'Satir/Kritis', 'Nostalgia/Reflektif'
];

export const StoryForm: React.FC<StoryFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    filmTitle: '',
    duration: '',
    genre: '',
    language: 'Indonesian',
    targetAudience: '',
    primaryPurpose: '',
    storyPremise: '',
    mainConflict: '',
    moodTone: '',
    customWords: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.filmTitle && formData.duration && formData.genre && 
                     formData.targetAudience && formData.primaryPurpose && 
                     formData.storyPremise && formData.mainConflict && formData.moodTone;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-xl border border-slate-600">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Sparkles className="text-orange-400" size={28} />
          Generator Cerita Film
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            label="Judul Film"
            value={formData.filmTitle}
            onChange={(value) => updateField('filmTitle', value)}
            placeholder="Masukkan judul film Anda"
            required
            allowCustom={true}
            fieldKey="filmTitle"
          />
          
          <FormInput
            label="Durasi (menit)"
            type="select"
            value={formData.duration}
            onChange={(value) => updateField('duration', value)}
            options={DURATIONS}
            required
          />
          
          <FormInput
            label="Genre"
            type="select-with-custom"
            value={formData.genre}
            onChange={(value) => updateField('genre', value)}
            options={GENRES}
            required
            allowCustom={true}
            fieldKey="genre"
          />
          
          <FormInput
            label="Bahasa"
            type="select-with-custom"
            value={formData.language}
            onChange={(value) => updateField('language', value)}
            options={LANGUAGES}
            required
            allowCustom={true}
            fieldKey="language"
          />
          
          <FormInput
            label="Target Audiens"
            type="select"
            value={formData.targetAudience}
            onChange={(value) => updateField('targetAudience', value)}
            options={TARGET_AUDIENCES}
            required
          />
          
          <FormInput
            label="Tujuan Utama"
            type="select-with-custom"
            value={formData.primaryPurpose}
            onChange={(value) => updateField('primaryPurpose', value)}
            options={PRIMARY_PURPOSES}
            required
            allowCustom={true}
            fieldKey="primaryPurpose"
          />
          
          <FormInput
            label="Jenis Konflik Utama"
            type="select-with-custom"
            value={formData.mainConflict}
            onChange={(value) => updateField('mainConflict', value)}
            options={MAIN_CONFLICTS}
            required
            allowCustom={true}
            fieldKey="mainConflict"
          />
          
          <FormInput
            label="Mood & Tone"
            type="select-with-custom"
            value={formData.moodTone}
            onChange={(value) => updateField('moodTone', value)}
            options={MOOD_TONES}
            required
            allowCustom={true}
            fieldKey="moodTone"
          />
        </div>
        
        <div className="mt-6">
          <FormInput
            label="Premis Cerita"
            type="textarea"
            value={formData.storyPremise}
            onChange={(value) => updateField('storyPremise', value)}
            placeholder="Jelaskan premis dasar cerita Anda..."
            required
            rows={4}
          />
        </div>
        
        <div className="mt-6">
          <CustomWordsInput
            customWords={formData.customWords}
            onChange={(words) => updateField('customWords', words)}
          />
        </div>

        <div className="mt-4 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
          <h4 className="text-blue-300 font-medium mb-2">📝 Catatan Penting:</h4>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Setiap scene berdurasi 8 detik dengan dialog maksimal 8-12 kata per karakter</li>
            <li>• Dialog dirancang agar dapat diucapkan dengan natural dalam 8 detik</li>
            <li>• Bahasa default adalah Indonesia, atau sesuai bahasa yang dipilih</li>
            <li>• Gunakan tombol "+" untuk menambah opsi kustom pada field yang tersedia</li>
            <li>• Opsi kustom akan tersimpan untuk penggunaan selanjutnya</li>
          </ul>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-3 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Membuat Cerita Anda...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Generate Cerita Film
          </>
        )}
      </button>
    </form>
  );
};