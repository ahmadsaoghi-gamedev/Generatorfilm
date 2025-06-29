export interface FormData {
  filmTitle: string;
  duration: string;
  genre: string;
  language: string;
  targetAudience: string;
  primaryPurpose: string;
  storyPremise: string;
  mainConflict: string;
  moodTone: string;
  customWords: string[];
}

export interface Scene {
  scene_number: number;
  time_range: string;
  location: string;
  visual: string;
  characters: string[];
  dialog: string;
  camera: string;
  mood: string;
  transition: string;
  cinematography: {
    gaya_sinematografi: string;
    pergerakan_kamera: string;
    sudut_kamera: string;
    panjang_fokus: string;
    pencahayaan: string;
    gradiasi_warna: string;
  };
  audio: {
    suasana_suara: string;
    musik_latar: string;
    efek_suara: string;
    volume: string;
  };
}

export interface StoryResult {
  film_title: string;
  duration: string;
  genre: string;
  language: string;
  target_audience: string;
  primary_purpose: string;
  main_conflict_type: string;
  mood_tone: string;
  summary: string;
  three_act_structure: {
    act_1: string;
    act_2: string;
    act_3: string;
  };
  total_scenes: number;
  characters: string[];
  scenes: Scene[];
  custom_words_used: string[];
  project_details: {
    created_at: string;
    estimated_production_time: string;
    recommended_equipment: string[];
  };
}
