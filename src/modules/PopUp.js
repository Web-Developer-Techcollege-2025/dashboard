import { create } from "../utils/create.js";
import modalimgsrc from "../assets/images/haandvaerker.jpg"

export function popup() {
      const modal = create("div");
      modal.className = "hidden fixed inset-0 flex items-center justify-center";

      const content = create("div");
      content.className = "flex w-1/2 h-1/2 bg-[var(--color-light-blue)]/95 rounded-[12px] ring-pink-400";
      modal.appendChild(content);

      const modalimg = create("img");
      modalimg.src = modalimgsrc;
      content.appendChild(modalimg);
      modalimg.className = "w-1/2 h-2/3 rounded-[12px]"

      const modalh1 = create("h1");
      modalh1.textContent = "Fælles morgenmad på medie"
      content.appendChild(modalh1)

      setInterval(() => {
          modal.classList.remove("hidden");
          setTimeout(() => {
              modal.classList.add("hidden");
          }, 5_000);
      }, 6_000);

      return modal;
  }
