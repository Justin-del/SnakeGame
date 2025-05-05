window.addEventListener("touchstart", handleTouchStart, false)
window.addEventListener("touchmove", handleTouchMove, false)

let xDown = null;
let yDown = null;


function handleTouchStart(event){
    const touchStart = event.changedTouches[0];
    xDown = touchStart.screenX;
    yDown = touchStart.screenY;
}

function handleTouchMove(event){
    const touchMove = event.changedTouches[0]

    let xUp = touchMove.screenX;
    let yUp = touchMove.screenY;

    let xDifference = xUp - xDown
    let yDifference = yUp - yDown

    let swipeDirection = ""


    if (Math.abs(xDifference)>Math.abs(yDifference)){
        if (xDifference > 0){
            swipeDirection = "right"
        } else {
            swipeDirection = "left"
        }
    } else {
        if (yDifference > 0){
            swipeDirection = "down"
        } else {
            swipeDirection = "up"
        }
    }

    const swipeEvent = new CustomEvent("swipe", {
        detail:{
            direction:swipeDirection
        }
    })
    window.dispatchEvent(swipeEvent)


}
