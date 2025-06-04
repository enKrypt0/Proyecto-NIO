// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gparzellovdggnwqglhk.supabase.co'; // reemplaza con tu URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYXJ6ZWxsb3ZkZ2dud3FnbGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODM0MjgsImV4cCI6MjA2MzM1OTQyOH0.dv6E8l78SCkb9yRyej5OnjfmCTYZigApTTecDhdtd7c'; // la clave anónima pública

export const supabase = createClient(supabaseUrl, supabaseKey);
