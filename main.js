function toggle_nav(event) {
    event.stopPropagation();
    let element = event.target.tagName == "SPAN" ? event.target.parentNode :  event.target;
    let state = element.className;

    if (state == "active") {
        element.className = "inactive";
    }
    else if (state == "inactive") {
        element.className = "active";
    }
}

window.addEventListener("load", () => {
    const nav_items = document.getElementsByClassName("inactive");

    for (let i = 0; i < nav_items.length; i++) {
        nav_items[i].addEventListener("click", toggle_nav);
    }
});
