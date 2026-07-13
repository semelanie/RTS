import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://bwjhoesxdgazgswgxnjl.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBiNmQwMjcxLTcwYjQtNDBjMS1hYzRjLWM5ZDc2YzdhNGZiOCJ9.eyJwcm9qZWN0SWQiOiJid2pob2VzeGRnYXpnc3dneG5qbCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgxMDc2ODE4LCJleHAiOjIwOTY0MzY4MTgsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.4HZwCaQHs-K7zuPt3p58-eDYN8qmidcW2RzYyINj0vM';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };