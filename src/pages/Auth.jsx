
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (mode === "signup" && form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const account = {
      name: mode === "signup" ? form.name.trim() : form.email.split("@")[0],
      email: form.email
    };

    localStorage.setItem("mallora-user", JSON.stringify(account));
    setSuccess(mode === "signup" ? "Your account has been created!" : "Welcome back!");
    window.setTimeout(() => navigate("/"), 900);
  };

  return (
    <main className="min-h-[75vh] grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative min-h-[700px]">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
          alt="Mallora shopping experience"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-16 left-14 right-14 text-white">
          <p className="eyebrow text-[#e2c49a]">WELCOME TO MALLORA</p>
          <h2 className="font-display text-6xl mt-5">A world of style awaits.</h2>
          <p className="text-sm text-gray-200 mt-5">Your favorite brands. Your favorite experiences. All in one destination.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-7 md:p-14">
        <div className="w-full max-w-[430px]">
          <p className="eyebrow">{mode === "login" ? "WELCOME BACK" : "JOIN THE MALLORA COMMUNITY"}</p>
          <h1 className="font-display text-4xl mt-4">
            {mode === "login" ? "Sign in." : "Create account."}
          </h1>
          <p className="text-sm text-gray-500 mt-3">
            {mode === "login" ? "Enter your details to continue shopping." : "Create your account and discover more."}
          </p>

          <div className="grid grid-cols-2 mt-9 border-b border-black/10">
            <button onClick={() => { setMode("login"); setError(""); setSuccess(""); }} className={`py-4 text-xs font-bold tracking-widest ${mode === "login" ? "border-b-2 border-black" : "text-gray-400"}`}>
              SIGN IN
            </button>
            <button onClick={() => { setMode("signup"); setError(""); setSuccess(""); }} className={`py-4 text-xs font-bold tracking-widest ${mode === "signup" ? "border-b-2 border-black" : "text-gray-400"}`}>
              SIGN UP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {mode === "signup" && (
              <div>
                <label className="text-xs font-semibold block mb-3">Full name</label>
                <div className="flex items-center gap-3 border-b border-black/20 pb-3">
                  <UserRound size={17} className="text-gray-400" />
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full bg-transparent text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold block mb-3">Email address</label>
              <div className="flex items-center gap-3 border-b border-black/20 pb-3">
                <Mail size={17} className="text-gray-400" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-3">Password</label>
              <div className="flex items-center gap-3 border-b border-black/20 pb-3">
                <LockKeyhole size={17} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-transparent text-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-xs">{error}</p>}
            {success && <p className="text-green-700 text-xs">{success}</p>}

            <button type="submit" className="btn-primary w-full">
              {mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"} <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">
            By continuing, you agree to our terms and privacy policy.
          </p>
          <Link to="/" className="block text-center text-xs mt-6 underline">BACK TO HOME</Link>
        </div>
      </div>
    </main>
  );
}