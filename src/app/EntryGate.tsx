import { lazy, Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { ENTRY_ACCOUNT, ENTRY_SESSION_KEY } from "./entryConfig";
import "./entry-gate.css";

const BirthdayApp = lazy(() => import("./App"));

function hasSession() {
  try { return sessionStorage.getItem(ENTRY_SESSION_KEY) === "active"; }
  catch { return false; }
}

function WorkspaceLoading() {
  return <main className="job-entry job-entry--loading" aria-busy="true">
    <div role="status"><span className="job-entry__spinner" aria-hidden="true" />Đợi xíu nha…</div>
  </main>;
}

export default function EntryGate() {
  const [unlocked, setUnlocked] = useState(hasSession);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = unlocked ? "Dành cho em Meo 🤍" : "little space · vào xem thử";
  }, [unlocked]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim() !== ENTRY_ACCOUNT.username || password !== ENTRY_ACCOUNT.password) {
      setError(true);
      passwordRef.current?.focus();
      return;
    }
    // Keep a refresh in this tab inside the story; credentials are never stored.
    try { sessionStorage.setItem(ENTRY_SESSION_KEY, "active"); } catch { /* Still open when storage is unavailable. */ }
    setPassword("");
    setUnlocked(true);
    window.scrollTo(0, 0);
  };

  if (unlocked) return <Suspense fallback={<WorkspaceLoading />}><BirthdayApp /></Suspense>;

  return <main className="job-entry">
    <header className="job-entry__header"><a className="job-entry__brand" href={import.meta.env.BASE_URL}>little space<span aria-hidden="true">✳</span></a><span>một chiếc demo nhỏ.</span></header>
    <div className="job-entry__main">
      <div className="job-entry__window-bar" aria-hidden="true"><span><i /><i /><i /></span><span>vào xem thử / 01</span><span>↗</span></div>
      <section className="job-entry__intro" aria-labelledby="demo-title">
        <span id="demo-title" className="job-entry__eyebrow">hello, bạn ghé chơi.</span>
        <div className="job-entry__desk" aria-hidden="true">
          <div className="job-entry__folder"><span>little things</span><svg viewBox="0 0 130 80" fill="none"><path d="M8 60c23-48 73-58 108-31M103 16l14 12-15 13" /></svg><small>open & explore ↗</small></div>
          <div className="job-entry__sticky"><i />big things<span>thank you :)</span></div>
        </div>
      </section>
      <section className="job-entry__panel" aria-labelledby="login-title">
        <span className="job-entry__panel-label">01 / cửa vào</span>
        <h2 id="login-title">Đăng nhập xíu nha.</h2>
        <p>Hai ô thôi, rồi mình bắt đầu.</p>
        <form onSubmit={submit}>
          <label htmlFor="job-username">Người dùng</label>
          <input id="job-username" name="username" value={username} autoComplete="username" autoCapitalize="none" spellCheck={false} required
            placeholder="Tên người dùng" aria-invalid={error} aria-describedby={error ? "job-login-error" : undefined}
            onChange={event => { setUsername(event.target.value); setError(false); }} />
          <label htmlFor="job-password">Mật khẩu</label>
          <div className="job-entry__password">
            <input ref={passwordRef} id="job-password" name="password" type={showPassword ? "text" : "password"} value={password}
              autoComplete="current-password" required placeholder="Nhập mật khẩu" aria-invalid={error} aria-describedby={error ? "job-login-error" : undefined}
              onChange={event => { setPassword(event.target.value); setError(false); }} />
            <button type="button" aria-controls="job-password" aria-pressed={showPassword} aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              onClick={() => setShowPassword(value => !value)}>{showPassword ? "Ẩn" : "Hiện"}</button>
          </div>
          <div className="job-entry__feedback" id="job-login-error" aria-live="polite" aria-atomic="true">
            {error && "Hình như gõ nhầm xíu rồi. Kiểm tra lại hai ô nha."}
          </div>
          <button className="job-entry__submit" type="submit">Vào xem thử<span aria-hidden="true">↗</span></button>
        </form>
      </section>
    </div>
    <footer className="job-entry__footer"><span>a little space to explore.</span><span>made slowly, just for fun.</span></footer>
  </main>;
}
