const followersBtn = document.getElementById('followers-btn')
const followingsPopupContainer = document.getElementById('followings-popup-container')
const followingsCancel = document.getElementById('followingsCancel')
const followingsContainer = document.getElementsByClassName('followings-container')[0]
const cardsContainer = document.getElementsByClassName('cards-container')[0]

let followersPage = 1
let followersLimit = 7

followingsCancel.addEventListener('click', () =>{
    followingsPopupContainer.classList.remove('popup-container-show')
    cardsContainer.innerHTML = ''
    followersPage = 1
})

// clicking the 'Followers' number to view followers
followersBtn.addEventListener('click', async function(){
    await loadMoreFollowers()
    followingsPopupContainer.classList.add('popup-container-show')
})

// check if the user scrolled all the way down
followingsContainer.addEventListener('scroll', async function () {
    console.log('hello 1')
    const container = this
    if (container.scrollHeight - container.scrollTop === container.clientHeight) {
        console.log('hello 2')
        await loadMoreFollowers();
    }
})

async function loadMoreFollowers(){
    const userId = followersBtn.dataset.userId
    try{
        const response = await fetch(`/users/followers/${userId}?currentPage=${followersPage}&limit=${followersLimit}`, {
            method: 'GET'
        })
        if(response.ok){
            const responseData = await response.json()
            responseData.forEach(follower => {
                let newCard = document.createElement('div')
                let cardInfo = document.createElement('div')
                let imgContainer = document.createElement('div')
                let img = document.createElement('img')
                let username = document.createElement('p')
                
                newCard.classList.add('following-card')
                cardInfo.classList.add('following-card-info')
                imgContainer.classList.add('following-card-img-container')
                img.classList.add('following-card-img')
                img.src = `/uploads/profile_images/${follower.profileImageName}`
                username.classList.add('following-card-username')
                username.innerText = follower.username

                newCard.appendChild(cardInfo)
                cardInfo.appendChild(imgContainer)
                cardInfo.appendChild(username)
                imgContainer.appendChild(img)

                cardsContainer.appendChild(newCard)
            })
            followersPage++
        }else{
            console.log('Response was not ok !')
        }
    }catch (error){
        console.log('Error: ' + error)
    }
}