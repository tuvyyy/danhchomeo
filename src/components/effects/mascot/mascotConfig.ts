import type { ChapterId } from "@/chapters/types";

export type MascotAccessory = "pilot" | "flower" | "envelope-red" | "letter" | "camera" | "heart" | "party";
export interface MascotSceneConfig {
  name: string;
  accessory: MascotAccessory;
  side: "left" | "right";
  messages: readonly string[];
}

export const MASCOT_SCENES: Record<ChapterId, MascotSceneConfig> = {
  hero: { name: "Heo phi công", accessory: "pilot", side: "left", messages: ["Lướt xuống để cục vàng vào xứ sở thần tiền nháaaaa", "Ngắm cảnh phía sau đi cô nương, quơ chuột kiếm kho báu"] },
  flowers: { name: "Heo làm vườn", accessory: "flower", side: "left", messages: ["Xem phim AI cùng cam và màu đen vớ trắng nhá", "Meo là bông hoa tui thương nhất!"] },
  wallet: { name: "Heo mang quà", accessory: "envelope-red", side: "left", messages: ["Click dô dấu sáp để nhận tình ewwwww", "Bốn lời hẹn nhỏ trong thư, meo chạm từng voucher để xem nha."] },
  letter: { name: "Heo đưa thư", accessory: "letter", side: "right", messages: ["Xem hoa nở nà, rồi meo click vô thư để đọc ẻm nhó", "Cứ đọc chậm thôi, tui ngồi đây với em."] },
  moments: { name: "Heo chụp ảnh", accessory: "camera", side: "left", messages: ["Cười lên meo ơi… tách!", "Chạm từng tấm ảnh để mở lại kỷ niệm nha."] },
  anniversary: { name: "Heo ôm thương nhớ", accessory: "heart", side: "right", messages: ["Click dô từng mục rồi đón nhận tín hịu éc ô éc của em bé nhóooooo", "Mình còn nhiều ngày đẹp phía trước lắm."] },
  finale: { name: "Heo mừng sinh nhật", accessory: "party", side: "left", messages: ["Cục meo cam ước xong, rồi meo quơ con chuột thổi nến là ẻm tắt nàii. Kiểu quơ qua ngọn lửa sau khi meo ước là nến sẽ tắt. Ước xong hẵn thổi nến nháaaaaa", "Háp py háp py hàp py!"] },
};
