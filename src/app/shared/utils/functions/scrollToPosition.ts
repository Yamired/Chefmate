export function scrollToPosition(destination: "top" | "bottom"): void {
    const nextScrollPostion: number = destination === "top" ? 0 : document.body.scrollHeight;
    window.scrollTo({top: nextScrollPostion, behavior: 'smooth'});
}