/* Open/Close Store */
keyframer.createCSSTransitionOn(
    "click", ".store-overlay", "transform 0.5s ease-in", {
        transform: "none",
        pointerEvents: "auto"
}, "#launchStore");

function closeMenu(){
    keyframer.createCSSTransition(".store-overlay", "transform 0.5s ease-out", {
            transform: "scale(0)",
            pointerEvents: "none"
    });
}

document.querySelector("#closeMenu").addEventListener("click", closeMenu);