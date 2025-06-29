import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface CustomWordsInputProps {
  customWords: string[];
  onChange: (words: string[]) => void;
}

export const CustomWordsInput: React.FC<CustomWordsInputProps> = ({
  customWords,
  onChange
}) => {
  const [inputValue, setInputValue] = useState('');

  const addWord = () => {
    if (inputValue.trim() && !customWords.includes(inputValue.trim())) {
      onChange([...customWords, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeWord = (index: number) => {
    onChange(customWords.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addWord();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300">
        Kata/Frasa Kustom
      </label>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Masukkan kata atau frasa kustom"
          className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
        />
        <button
          type="button"
          onClick={addWord}
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={16} />
          Tambah
        </button>
      </div>

      {customWords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customWords.map((word, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
            >
              <span className="text-sm">{word}</span>
              <button
                type="button"
                onClick={() => removeWord(index)}
                className="text-slate-400 hover:text-red-400 transition-colors duration-200"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
