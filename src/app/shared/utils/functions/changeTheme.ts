
export function changeTheme(value: string) {
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("data-theme", value);
}