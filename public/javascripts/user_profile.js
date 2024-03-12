const profileImage = document.getElementById('profileImage1')
const popupContainer = document.getElementById('profileImgPopupContainer')
const popupCancel = document.getElementsByClassName('popup-cancel')[0]
const likeBtns = [...document.getElementsByClassName('likeBtn')]


profileImage.addEventListener('click', () => {
    popupContainer.classList.add('popup-container-show')

    setTimeout(function () {
        document.getElementsByClassName('popup')[0].classList.add('popup-center')
    }, 100);
})

popupCancel.addEventListener('click', () => {
    popupContainer.classList.remove('popup-container-show')
})


likeBtns.forEach((btn) => {
    btn.addEventListener('click', async function () {
        const postId = this.dataset.postId;
        try {
            const response = await fetch(`/likes/${postId}`, {
                method: 'POST',
            });
            if (response.ok) {
                const responseData = await response.json()
                // todo: based on if the like is created or removed, apply changes to the UI
                if (responseData.message == 'Like created'){
                    
                }
                // Update the UI to reflect the like action
                btn.style.backgroundColor = 'red'
            } else {
                console.log('Error')
            }
        } catch (error) {
            console.log('Error: ' + error)
        }
    })
})

