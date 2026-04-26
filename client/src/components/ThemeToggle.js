import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="toggle" onClick={() => setDark(!dark)}>
      {dark ? "☀️ Light" : "🌙 Dark"}
    </div>
  );
}