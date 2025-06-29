
import { FormData, StoryResult } from '../types';

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

function createPrompt(formData: FormData): string {
  const customWordsText = formData.customWords.length > 0 
    ? formData.customWords.join(', ') 
    : 'Tidak ada kata kustom khusus yang diberikan';

  const isIndonesian = formData.language === 'Indonesian';
  const dialogueInstruction = isIndonesian 
    ? 'Dialog harus dalam bahasa Indonesia yang natural dan dapat diucapkan dengan lancar dalam 8 detik. PENTING: Gunakan dialog yang PANJANG dan NATURAL seperti percakapan sehari-hari, bukan dialog pendek. Setiap karakter bisa berbicara 15-25 kata atau lebih dalam satu giliran, selama masih bisa diucapkan dalam 8 detik dengan natural.'
    : `Dialog harus dalam bahasa ${formData.language} yang natural dan dapat diucapkan dengan lancar dalam 8 detik. PENTING: Gunakan dialog yang PANJANG dan NATURAL seperti percakapan sehari-hari, bukan dialog pendek. Setiap karakter bisa berbicara 15-25 kata atau lebih dalam satu giliran, selama masih bisa diucapkan dalam 8 detik dengan natural.`;

  return `Anda adalah AI penulis skenario ahli yang bertugas menghasilkan cerita film profesional yang disesuaikan untuk Veo3, platform yang memerlukan breakdown scene cerdas dan format 3-act yang terstruktur. Output Anda harus sangat detail, kreatif, dan selaras dengan parameter input pengguna.

**Parameter Input:**
- **Judul Film:** ${formData.filmTitle}
- **Durasi:** ${formData.duration} menit
- **Genre:** ${formData.genre}
- **Bahasa:** ${formData.language}
- **Target Audiens:** ${formData.targetAudience}
- **Tujuan Utama:** ${formData.primaryPurpose}
- **Jenis Konflik Utama:** ${formData.mainConflict}
- **Mood & Tone:** ${formData.moodTone}
- **Premis Cerita:** ${formData.storyPremise}
- **Kata/Frasa Kustom:** ${customWordsText}

**PERSYARATAN DIALOG YANG SANGAT PENTING:**
1. **Dialog Panjang dan Natural:** Setiap scene harus memiliki dialog yang PANJANG dan NATURAL seperti percakapan sehari-hari
2. **Contoh Dialog yang Diinginkan:**
   Karakter 1: "Hai para penontooon! Kenalin gua Ardi… ini di samping gua, temen gua Joni, sama Jono!"
   Karakter 2: "Yoi bro!"
   Karakter 1: "Kita bertiga nih… lagi cari janda, bro! Hahaha!"
   Joni & Jono: "Wkwkwkwk!!"

3. **Panjang Dialog:** Setiap karakter bisa berbicara 15-25 kata atau lebih dalam satu giliran
4. **Timing:** Dialog harus bisa diucapkan dengan natural dalam 8 detik (tidak terburu-buru)
5. **Interaksi Natural:** Gunakan kata sambung, jeda natural, dan ekspresi seperti "nih", "bro", "gua", "lo", dll untuk bahasa Indonesia
6. **Reaksi dan Respons:** Sertakan reaksi natural seperti tertawa, "wkwkwk", "hahaha", dll

**Persyaratan Khusus untuk Scene yang Ditingkatkan:**
1. **Interaksi Multi-Karakter:** Setiap scene harus melibatkan setidaknya dua karakter dengan dialog bolak-balik yang natural dan PANJANG
2. **Timing Dinamis:** Alokasikan sekitar 1-2 detik untuk visual setup, 5-6 detik untuk dialog panjang, dan 1-2 detik untuk reaksi/transisi
3. **Dialog Lucu dan Menarik:** Masukkan humor, kecerdasan, dan interaksi yang relatable dengan dialog yang PANJANG dan NATURAL
4. **Dukungan Visual:** Pastikan setiap scene memiliki isyarat visual yang kuat yang melengkapi dialog panjang (ekspresi, gerakan, detail setting)
5. **Transisi Sinematik:** Gunakan transisi seperti "Quick cut," "Pan transition," atau "Dramatic cut" untuk meningkatkan pacing dan mood

**Persyaratan Teknis:**
1. Bagi cerita menjadi tepat 8 scene dengan durasi 8 detik setiap scene untuk total ${formData.duration} menit
2. ${dialogueInstruction}
3. Gunakan bahasa ${formData.language} secara konsisten di seluruh cerita
4. Masukkan kata/frasa kustom di tempat yang sesuai
5. Pastikan tone profesional sambil mengikuti mood dan tone yang ditentukan
6. Berikan transisi yang jelas antar scene
7. Sertakan deskripsi visual yang meningkatkan storytelling
8. Dialog harus PANJANG dan NATURAL seperti percakapan sehari-hari, bukan dialog pendek
9. Setiap scene harus membangun menuju klimaks dan resolusi
10. Pastikan alur cerita kohesif dan mengalir natural di semua 8 scene
11. Sertakan detail sinematografi dan audio yang komprehensif untuk setiap scene

**Format Output yang Diperlukan - Respon HANYA dengan JSON yang valid:**

{
  "film_title": "${formData.filmTitle}",
  "duration": "${formData.duration} menit",
  "genre": "${formData.genre}",
  "language": "${formData.language}",
  "target_audience": "${formData.targetAudience}",
  "primary_purpose": "${formData.primaryPurpose}",
  "main_conflict_type": "${formData.mainConflict}",
  "mood_tone": "${formData.moodTone}",
  "summary": "Ringkasan singkat yang menarik dari premis cerita",
  "three_act_structure": {
    "act_1": "Deskripsi setup (scene 1-3)",
    "act_2": "Deskripsi konflik (scene 4-6)", 
    "act_3": "Deskripsi resolusi (scene 7-8)"
  },
  "total_scenes": 8,
  "characters": ["Karakter Utama", "Karakter Pendukung"],
  "scenes": [
    {
      "scene_number": 1,
      "time_range": "0-8s",
      "location": "Nama lokasi spesifik",
      "visual": "Deskripsi visual detail untuk Veo3 dengan ekspresi karakter, gerakan, dan detail setting",
      "characters": ["Nama karakter yang hadir"],
      "dialog": "Dialog PANJANG dan NATURAL dalam ${formData.language} dengan interaksi multi-karakter yang natural (15-25 kata atau lebih per karakter, dapat diucapkan natural dalam 8 detik). Contoh: 'Hai para penontooon! Kenalin gua Ardi… ini di samping gua, temen gua Joni, sama Jono!' - 'Yoi bro!' - 'Kita bertiga nih… lagi cari janda, bro! Hahaha!' - 'Wkwkwkwk!!'",
      "camera": "Sudut/gerakan kamera spesifik",
      "mood": "Mood spesifik scene",
      "transition": "Transisi sinematik ke scene berikutnya (Quick cut, Pan transition, Dramatic cut, dll)",
      "cinematography": {
        "gaya_sinematografi": "Gaya visual keseluruhan scene",
        "pergerakan_kamera": "Gerakan kamera spesifik (pan, tilt, zoom, tracking, dll)",
        "sudut_kamera": "Sudut pengambilan gambar (close-up, medium shot, wide shot, dll)",
        "panjang_fokus": "Pengaturan fokus kamera (shallow depth, deep focus, rack focus, dll)",
        "pencahayaan": "Setup pencahayaan (natural light, dramatic lighting, soft light, dll)",
        "gradiasi_warna": "Palet warna dan grading (warm tones, cool tones, high contrast, dll)"
      },
      "audio": {
        "suasana_suara": "Ambient sound dan atmosfer",
        "musik_latar": "Jenis dan mood musik latar",
        "efek_suara": "Sound effects spesifik yang dibutuhkan",
        "volume": "Level dan mixing audio (loud, soft, balanced, dll)"
      }
    }
  ],
  "custom_words_used": ["Daftar kata kustom yang dimasukkan dalam cerita"],
  "project_details": {
    "created_at": "${new Date().toISOString()}",
    "estimated_production_time": "Estimasi waktu produksi berdasarkan kompleksitas",
    "recommended_equipment": ["Kamera", "Pencahayaan", "Peralatan audio", "Aksesori tambahan"]
  }
}

**Contoh Dialog Multi-Karakter PANJANG yang Diharapkan:**
Karakter: Ardi, Joni, Jono
Dialog:
Ardi: "Hai para penontooon! Kenalin gua Ardi… ini di samping gua, temen gua Joni, sama Jono!"
Joni: "Yoi bro! Gua Joni, yang paling ganteng di antara kita bertiga nih!"
Ardi: "Kita bertiga nih… lagi cari janda, bro! Yang kaya raya dan baik hati! Hahaha!"
Jono: "Eh, jangan lupa yang masih muda juga ya, bro!"
Semua: "Wkwkwkwk!! Hahaha!!"

Visual: Ardi memperkenalkan diri dengan percaya diri sambil menunjuk ke teman-temannya, Joni pose narsis, Jono terlihat skeptis tapi terhibur, semua tertawa bersama.
Kamera: Close-up pada Ardi saat berbicara, quick pan ke Joni saat dia bicara, medium shot untuk menunjukkan ketiganya berinteraksi, wide shot untuk menangkap momen tertawa bersama.

INGAT: Dialog harus PANJANG, NATURAL, dan seperti percakapan sehari-hari yang sesungguhnya. Jangan buat dialog pendek atau kaku. Gunakan bahasa yang natural dengan kata sambung, jeda, dan ekspresi yang wajar.

Hasilkan cerita yang menarik, lucu, dan kohesif yang mengalir natural di semua 8 scene, dengan setiap scene membangun menuju klimaks dan resolusi. Pastikan semua dialog PANJANG, NATURAL, dalam batas waktu 8 detik, dan mencakup interaksi multi-karakter yang engaging seperti percakapan sehari-hari yang sesungguhnya.`;
}

async function callGemini(prompt: string): Promise<StoryResult> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 6000,
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error response:', errorText);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Gemini API response:', data);
  
  const content = data.candidates[0]?.content?.parts[0]?.text;
  
  if (!content) {
    throw new Error('No content received from Gemini API');
  }

  try {
    // Clean up the response to extract JSON
    const cleanContent = content.trim();
    let jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      // Try to find JSON between code blocks
      const codeBlockMatch = cleanContent.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      if (codeBlockMatch) {
        jsonMatch = [codeBlockMatch[1]];
      }
    }
    
    if (!jsonMatch) {
      console.error('Gemini response content:', content);
      throw new Error('No valid JSON found in Gemini response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse Gemini response:', content);
    throw new Error('Failed to parse Gemini response as JSON');
  }
}

async function callDeepSeek(prompt: string): Promise<StoryResult> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DeepSeek API key not configured');
  }

  const response = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 6000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('DeepSeek API error response:', errorText);
    throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('DeepSeek API response:', data);
  
  const content = data.choices[0]?.message?.content;
  
  if (!content) {
    throw new Error('No content received from DeepSeek API');
  }

  try {
    // Clean up the response to extract JSON
    const cleanContent = content.trim();
    let jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      // Try to find JSON between code blocks
      const codeBlockMatch = cleanContent.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      if (codeBlockMatch) {
        jsonMatch = [codeBlockMatch[1]];
      }
    }
    
    if (!jsonMatch) {
      console.error('DeepSeek response content:', content);
      throw new Error('No valid JSON found in DeepSeek response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse DeepSeek response:', content);
    throw new Error('Failed to parse DeepSeek response as JSON');
  }
}

async function callOpenRouter(prompt: string): Promise<StoryResult> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key not configured');
  }

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://film-story-generator.com',
      'X-Title': 'Film Story Generator',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 6000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenRouter API error response:', errorText);
    throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('OpenRouter API response:', data);
  
  const content = data.choices[0]?.message?.content;
  
  if (!content) {
    throw new Error('No content received from OpenRouter API');
  }

  try {
    // Clean up the response to extract JSON
    const cleanContent = content.trim();
    let jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      // Try to find JSON between code blocks
      const codeBlockMatch = cleanContent.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      if (codeBlockMatch) {
        jsonMatch = [codeBlockMatch[1]];
      }
    }
    
    if (!jsonMatch) {
      console.error('OpenRouter response content:', content);
      throw new Error('No valid JSON found in OpenRouter response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse OpenRouter response:', content);
    throw new Error('Failed to parse OpenRouter response as JSON');
  }
}

export async function generateStory(formData: FormData): Promise<StoryResult> {
  const prompt = createPrompt(formData);
  
  try {
    console.log('Attempting to call Gemini API first...');
    return await callGemini(prompt);
  } catch (geminiError) {
    console.warn('Gemini failed, trying DeepSeek:', geminiError);
    
    try {
      console.log('Attempting to call DeepSeek API...');
      return await callDeepSeek(prompt);
    } catch (deepSeekError) {
      console.warn('DeepSeek failed, trying OpenRouter:', deepSeekError);
      
      try {
        console.log('Attempting to call OpenRouter API...');
        return await callOpenRouter(prompt);
      } catch (openRouterError) {
        console.error('All APIs failed:', { geminiError, deepSeekError, openRouterError });
        throw new Error('All APIs (Gemini, DeepSeek, and OpenRouter) failed. Please check your API keys and try again.');
      }
    }
  }
}
