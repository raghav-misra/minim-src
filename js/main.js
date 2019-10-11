/* Theme Switcher */
function switchTheme(theme){
    themeSelect.value = theme;
    document.body.setAttribute("theme", theme);
    localStorage.setItem("theme", theme);
}
let themeSelect = document.querySelector("#themeSelect");
themeSelect.oninput =  ()=>{ switchTheme(themeSelect.value); }
switchTheme(localStorage.getItem("theme") || "dark");

/* Utils (Stuff I copied from StackOverflow) */
function escapeString(html) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(html));
    return p.innerHTML;
}

function checkURL(url) {
    return new RegExp('^(https?:\\/\\/)'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i').test(url);
}
 




