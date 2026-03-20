import { create } from "./utils/create"

export function superTim(){
    const modal = create("div")
    modal.classList = "hidden fixed inset-0 flex items-center justify-center"

    const container = create("div")

    const img = create("img")
    img.src = "public/supertim.jpg"
    img.alt = "supertim"

    const h2 = create("h2")
    h2.textContent = "SUPERTIM!!!"

    setInterval(() => {
        modal.classList.remove("hidden")
        setTimeout(() => {
            modal.classList.add("hidden")
        }, 5_000);
    }, 6_000)

    modal.append(container)
    container.append(img,h2)

    return modal;
}