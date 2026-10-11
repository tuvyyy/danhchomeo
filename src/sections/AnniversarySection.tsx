import { useState } from "react";
import { BIRTHDAY_DATA } from "@/data/birthdayContent";
import { useId, useRef, type KeyboardEvent } from "react";
import { useChapterFlow } from "@/chapters/useChapterFlow";
import couplePhoto from "@/assets/hero/couple-original-tone.png";
import "./anniversary-scene.css";

function daysSinceAnniversary() {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const value = (type: string) => Number(today.find(part => part.type === type)?.value);
  return Math.max(0, Math.floor((Date.UTC(value("year"), value("month") - 1, value("day")) - Date.UTC(2025, 0, 11)) / 86_400_000));
}

const notes = [
  {
    title: "mon bel amour", subtitle: "ngày mình bắt đầu",
    paragraphs: [
      "Có một ngày, giữa rất nhiều ngày bình thường, tụi mình tìm thấy nhau. Từ hôm ấy, tui có thêm một người để nhớ, một người để kể nghe những chuyện nhỏ xíu trong ngày.",
      "11 tháng 01 năm 2025.",
    ],
    closing: "Từ hôm đó, ngày nào cũng có sở thú và nhiều màu sắc cùng nhau.",
  },
  {
    title: "despite the miles", subtitle: "xa một chút, thương nhiều chút",
    paragraphs: [
      "Sài Gòn — Hà Nội.",
      "Hong có xa xôi gì cạ, còn trong Việt Nam là ở đâu cũng là nhà. Mong ở Hà Nội chăm meo lên mấy cân để em bé chọt bụng meo meo nhá",
    ],
    closing: "",
  },
  {
    title: "More n more....", subtitle: "vẫn là meo và tui",
    paragraphs: [
      "Hi vọng một ngày không xa sẽ gặp lại em meo, lúc đẩy tưởng tượng ra òi, mong nhà mình cùng nhau cố gắng nhá. Không dì là không thể với nhà mình, quánh quái giỏi nhất hệ mặt trời mờ. Yêu thương thật nhiều và thương yêu rất nhiều ạ.",
    ],
    closing: "Cảm ơn em, vì hôm nay vẫn cùng em bé viết tiếp nhiều chương như này.",
  },
];

export default function AnniversarySection() {
  const { anniversary } = BIRTHDAY_DATA;
  const { goTo } = useChapterFlow();
  const [selected, setSelected] = useState(0);
  const navigationId = useId();
  const tabsRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const selectNote = (index: number) => {
    if (index === selected) return;
    setSelected(index);
    requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Only a newly selected note fades in. Chapter arrival owns its own timing.
      if (!reduced) copyRef.current?.querySelector('.together-note')?.animate([
        { opacity: .72, transform: "translateY(3px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 200, easing: "cubic-bezier(.16,1,.3,1)" });
      if (window.matchMedia("(max-width: 760px)").matches) copyRef.current?.scrollIntoView({
        behavior: reduced ? "instant" : "smooth", block: "start",
      });
    });
  };
  const navigateTabs = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % notes.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + notes.length - 1) % notes.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = notes.length - 1;
    else return;
    event.preventDefault();
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus({ preventScroll: true });
    selectNote(next);
  };
  const note = notes[selected];
  return <section className="anniversary-scene together-scene" data-milestone={selected} aria-label={anniversary.chapter}>
    <div className="together-frame" aria-hidden="true"/>
    <header className="together-header"><span>CHƯƠNG 05 / NGÀY CỦA TỤI MÌNH</span><span>MỘT TRANG ĐỂ GIỮ LẠI</span></header>
    <div className="together-main">
      <article className="together-paper" data-mascot-obstacle aria-label="Trang kỷ niệm của tụi mình">
          <figure className="together-photo">
            <img src={couplePhoto} alt="Tấm ảnh hai đứa mình bên nhau" width="1922" height="818" draggable={false}/>
            <figcaption>our little story · since 2025</figcaption>
          </figure>
          <div ref={copyRef} className="together-copy" role="tabpanel" id={`${navigationId}-panel`} aria-labelledby={`${navigationId}-tab-${selected}`} tabIndex={0}>
            <span className="together-reading-label">Đang đọc <i aria-hidden="true">·</i> Trang 0{selected + 1} / 03</span>
            <div key={selected} className="together-note">
              <div className="together-note__heading"><h3>{note.title}</h3><span>{note.subtitle}</span></div>
              <div className="together-note__body">{note.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
              {note.closing && <p className="together-note__closing">{note.closing}</p>}
              <span className="together-signature">thương em meo, nhớ em meo lắm.</span>
            </div>
          </div>
          <aside className="together-margin">
            <h2>Ngày của tụi mình.</h2>
            <div className="together-date"><span>TỪ NGÀY</span><time dateTime="2025-01-11"><span>11.01</span><span>2025</span></time></div>
            <div className="together-count"><strong>{daysSinceAnniversary()}</strong><span>ngày bên nhau</span></div>
            <span className="together-page-number">0{selected + 1} / 03</span>
          </aside>
      </article>
    </div>
    <div className="together-navigation">
      <div className="together-navigation__heading"><span>LẬT TRANG KỶ NIỆM</span><span>Chọn một trang để đọc.</span></div>
      <div ref={tabsRef} className="together-stations" role="tablist" aria-label="Chọn trang kỷ niệm">
        {anniversary.beats.map((beat, index) => <button key={beat.label} className="together-station" role="tab"
          id={`${navigationId}-tab-${index}`} aria-controls={`${navigationId}-panel`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
          onKeyDown={event => navigateTabs(event, index)} onClick={() => selectNote(index)}>
          <span className="together-station__top"><span className="together-station__number">0{index + 1}</span><span className="together-station__status">{selected === index ? <><i aria-hidden="true">✓</i> Đang đọc</> : <>Bấm để mở <i aria-hidden="true">↗</i></>}</span></span>
          <span className="together-station__copy"><small>{beat.label}</small><strong>{beat.copy}</strong></span>
        </button>)}
      </div>
    </div>
    <footer className="together-footer"><button className="together-next" onClick={() => goTo(0)}>Xem lại từ đầu <i aria-hidden="true">↺</i></button></footer>
  </section>;
}
