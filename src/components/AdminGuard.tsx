import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setChecking(false);
      if (!data.session) window.location.href = '/admin';
    });
  }, []);

  if (checking) return (
    <div className="min-h-screen bg-[#08142C] flex items-center justify-center">
      <div className="text-white font-semibold">Checking access…</div>
    </div>
  );

  return authed ? <>{children}</> : null;
};

export default AdminGuard;
