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
    <div role="status"><span className="job-entry__spinner" aria-hidden="true" />Đang mở phiên làm việc…</div>
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
    document.title = unlocked ? "Dành cho em Meo 🤍" : "Job Console · Workspace";
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
    <header className="job-entry__header">
      <a className="job-entry__brand" href={import.meta.env.BASE_URL} aria-label="Job Console">
        <span aria-hidden="true">J</span><strong>Job Console</strong>
      </a>
      <span className="job-entry__workspace">PRIVATE WORKSPACE</span>
    </header>
    <div className="job-entry__main">
      <section className="job-entry__intro" aria-labelledby="workspace-title">
        <span className="job-entry__eyebrow"><i aria-hidden="true" />REVIEW ENVIRONMENT</span>
        <h1 id="workspace-title">Mở workspace.<br />Tiếp tục phiên chạy.</h1>
        <p>Đăng nhập bằng tài khoản được cấp để kiểm tra kết quả và tiếp tục phiên làm việc.</p>
        <div className="job-entry__preview" aria-hidden="true">
          <div className="job-entry__preview-header"><span>WORKFLOW / REVIEW</span><span>CHỜ ĐĂNG NHẬP</span></div>
          <div className="job-entry__pipeline"><span>01<i />Kết nối</span><b>→</b><span>02<i />Kiểm tra</span><b>→</b><span>03<i />Hoàn tất</span></div>
          <div className="job-entry__preview-footer"><i />Phiên làm việc sẵn sàng</div>
        </div>
      </section>
      <section className="job-entry__panel" aria-labelledby="login-title">
        <span className="job-entry__panel-label">WORKSPACE ACCESS</span>
        <h2 id="login-title">Đăng nhập</h2>
        <p>Nhập thông tin để mở phiên kiểm tra.</p>
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
            {error && "Tên người dùng hoặc mật khẩu chưa đúng. Thử lại nhé."}
          </div>
          <button className="job-entry__submit" type="submit">Đăng nhập<span aria-hidden="true">↗</span></button>
        </form>
        <div className="job-entry__access-note"><svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="2" /><path d="M5 7V5a3 3 0 0 1 6 0v2" /></svg>Chỉ dành cho tài khoản được cấp.</div>
      </section>
    </div>
    <footer className="job-entry__footer"><span>Job Console / Review workspace</span><span>SESSION ACCESS · V1.0</span></footer>
  </main>;
}
