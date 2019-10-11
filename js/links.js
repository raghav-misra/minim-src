/* Quicklinks LocalStorage Sync */
function parseLinkJSON(linkData, index){
    return `<div id="link${index}" class="quicklink"><button class="delete-link"><i class="material-icons-round">delete_sweep</i></button><a href="${linkData.href}"><span class="title">${escapeString(linkData.title)}</span></a></div>`;
}

let linksObject = JSON.parse(localStorage.getItem("links")) || [];
let linksContainer = document.querySelector("#userLinks");
localStorage.setItem("links", JSON.stringify(linksObject));
linksObject.forEach((linkData, index)=>{
    linksContainer.innerHTML += parseLinkJSON(linkData, index);
});

/* Create Quicklinks */
function closeLinksDialog(){
    keyframer.createCSSTransition(".link-overlay", "transform 0.5s ease-in", {
        transform: "scale(0)",
        pointerEvents: "none"
    });
}

keyframer.createCSSTransitionOn("click", ".link-overlay", 
    "transform 0.5s ease-in", {
    transform: "none",
    pointerEvents: "auto"
}, "#createLinkDialog");


document.querySelector("#cancelNewLink").addEventListener(
    "click", closeLinksDialog);

document.querySelector("#addLink").addEventListener("click", ()=>{
    let titleBox = document.querySelector("#linkTitleBox")
    let URLBox = document.querySelector("#linkURLBox");
    if(titleBox.value.trim() == "" || URLBox.value.trim() == "") return;
    linkHref = URLBox.value.trim();
    if(!checkURL(linkHref)) {
        URLBox.placeholder = "Check your URL...";
        URLBox.value = "";
        return
    }

    linksContainer.innerHTML += parseLinkJSON({
        title: document.querySelector("#linkTitleBox").value.trim(),
        href: linkHref
    }, linksContainer.childNodes.length);
    titleBox.value = "";
    URLBox.value = "";
    updateLinks();
    closeLinksDialog();
    bindDeleteLinks();
});

/* Delete Quicklinks */
function bindDeleteLinks(){
    document.querySelectorAll(".delete-link").forEach((element, i)=>{
        element.addEventListener("click", ()=>{
            keyframer.createCSSTransition(
                "#link" + i.toString(), 
                "height 250ms ease-out, padding 125ms ease-out, margin 125ms ease-out", {
                    height: "0",
                    paddingTop: "0",
                    paddingBottom: "0",
                    marginTop: "0",
                    marginBottom: "0"
            }, (el)=>{
                setTimeout(()=>{
                    el.parentNode.removeChild(el);
                    updateLinks();
                }, 240);
            });
        });
    });
}

bindDeleteLinks();

/* Update Quicklinks LocalStorage */
function updateLinks(){
    let links = [];
    linksContainer.childNodes.forEach((child)=>{
        linkAnchor = child.querySelector("a");
        linkTitle = linkAnchor.querySelector("span").innerText;
        links.push({ title: linkTitle, href: linkAnchor.href });
    });
    localStorage.setItem("links", JSON.stringify(links));
}