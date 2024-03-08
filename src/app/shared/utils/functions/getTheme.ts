export function getTheme(): string | null {
    return localStorage.getItem("data-theme");
}