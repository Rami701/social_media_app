const profileImage = document.getElementById('profileImage1')
const popupContainer = document.getElementsByClassName('popup-container')[0]
const popupCancel = document.getElementsByClassName('popup-cancel')[0]

profileImage.addEventListener('click', () => {
    popupContainer.classList.add('popup-container-show')

    setTimeout(function () {
        document.getElementsByClassName('popup')[0].classList.add('popup-center')
    }, 100);
})

popupCancel.addEventListener('click', () => {
    popupContainer.classList.remove('popup-container-show')
})

