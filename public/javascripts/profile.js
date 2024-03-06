const profileImage = document.getElementById('profileImage1')
const popupContainer = document.getElementsByClassName('popup-container')[0]
const popupCancel = document.getElementsByClassName('popup-cancel')[0]
const likeBtn = document.getElementById('likeBtn')

profileImage.addEventListener('click', () => {
    popupContainer.classList.add('popup-container-show')

    setTimeout(function () {
        document.getElementsByClassName('popup')[0].classList.add('popup-center')
    }, 100);
})

popupCancel.addEventListener('click', () => {
    popupContainer.classList.remove('popup-container-show')
})

likeBtn.addEventListener('click', async function () {
    const postId = this.dataset.postId;
    console.log('HHHHHHello    ' + this.dataset.postId)
    try {
        const response = await fetch(`/likes/${postId}`, {
            method: 'POST',
        });
        if (response.ok) {
            // Update the UI to reflect the like action
            likeBtn.style.backgroundColor = 'red'
        } else {
            console.log('Error')
        }
    } catch (error) {
        console.log('Error: ' + error)
    }
})
