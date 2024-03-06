const addPhotoBtn = document.getElementById('addPhotoBtn')
const fileInput = document.getElementById('newPostFileInput')
const imagePreview = document.getElementsByClassName('image-preview-container')[0]
const noPhotoP = document.getElementById('noPhotoP')
const nextBtn = document.getElementsByClassName('next-btn')[0]
const prevBtn = document.getElementsByClassName('prev-btn')[0]

let images = []
let activeImageIndex

addPhotoBtn.addEventListener('click', () => {
    fileInput.click()
})

fileInput.addEventListener('change', function () {
    const image = this.files[0]
    const reader = new FileReader()
    reader.onload = () => {
        const imgUrl = reader.result
        const img = document.createElement('img')
        img.src = imgUrl
        img.style.maxWidth = '90%'
        imagePreview.appendChild(img)
        images.push(img)
        if (images.length > 1) {
            imagePreview.removeChild(nextBtn)
            imagePreview.appendChild(nextBtn)
            prevBtn.style.display = 'block'
            nextBtn.style.display = 'block'
        }
        updateSlider()
        if (imagePreview.children.item(0) == noPhotoP) imagePreview.removeChild(noPhotoP)
    }
    reader.readAsDataURL(image)
})

nextBtn.addEventListener('click', () => {
    if (activeImageIndex >= images.length - 1) return
    activeImageIndex++
    displayActiveImage(activeImageIndex)
})

prevBtn.addEventListener('click', () => {
    if (activeImageIndex == 0) return
    activeImageIndex--
    displayActiveImage(activeImageIndex)
})

function displayActiveImage(index){
    for (let i = 0; i < images.length; i++){
        if(i != index){
            images[i].style.display = 'none'
        }else{
            images[i].style.display = 'block'
        }
    }
}

function updateSlider(){
    for (let i = 0; i < images.length - 1; i++){
        images[i].style.display = 'none'
    }
    if (images.length == 1){
        activeImageIndex = 0
    }else{
        activeImageIndex = images.length - 1
    }
}