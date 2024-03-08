export function changeModalVisibility(dialog: HTMLDialogElement, mode: "hide" | "show") {
    if(!dialog) { return; }
    if (mode === "show") {
        dialog.showModal();
    }
    if (mode === "hide") {
        dialog.close();
    }
}