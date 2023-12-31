document.addEventListener('DOMContentLoaded', () => {
    const rightArrow = document.getElementById('rightArrow')
    const leftArrow = document.getElementById('leftArrow')
    const container = document.getElementsByClassName('container')[0]
    const cards = document.getElementsByClassName('cards')
    let timesClicked = 0
    let selectedIndex = 1
    
    rightArrow.addEventListener('click', () => {
        if(selectedIndex == 0) {
            console.log('cannot perform the operation')
            return
        }
        timesClicked = timesClicked + 1;
        const finalPosition = timesClicked * 17;
        container.style.transform = `translateX(${finalPosition}rem)`
        cards[selectedIndex].classList.remove('selected')
        cards[selectedIndex-1].classList.add('selected')
        selectedIndex = selectedIndex - 1
    });
    leftArrow.addEventListener('click',()=>{
        if(selectedIndex == 5) {
            console.log("Cannot perform this operation")
            return
        }
        timesClicked = timesClicked - 1
        const finalPosition = timesClicked * 17
        container.style.transform = `translateX(${finalPosition}rem)`
        cards[selectedIndex].classList.remove('selected')
        cards[selectedIndex+1].classList.add('selected')
        selectedIndex = selectedIndex + 1
    })
});
