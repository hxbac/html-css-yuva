
const timelineCarousel = () => {
    const carouselWrapper = document.querySelector('.timeline__contents')
    const navItems = document.querySelectorAll('.timeline__nav-item')

    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                return
            }

            const navItemActive = document.querySelector('.timeline__nav-item.active')
            navItemActive && navItemActive.classList.remove('active')
    
            const contentSectionsActive = document.querySelector('.timeline__contents .timeline__item.active')
            contentSectionsActive && contentSectionsActive.classList.remove('active')
            this.classList.add('active')

            const idDetect = this.id.replace('timeline-nav-', '')
            const contentActiveNew = document.getElementById(`timeline-item-${idDetect}`)
            contentActiveNew && contentActiveNew.classList.add('active')
            
            const widthContentItem = contentActiveNew.offsetWidth
            if (index === 0) {
                carouselWrapper.style.transform = `translateX(${(window.innerWidth - widthContentItem) / 2}px)`
                return
            }
            const translateValue = widthContentItem * index - ((window.innerWidth - widthContentItem) / 2)
            carouselWrapper.style.transform = `translateX(-${translateValue < 0 ? -translateValue : translateValue}px)`
        })
    })

    navItems[1].dispatchEvent(new Event('click'))
}

const timerToSale = () => {
    const timestampToSale = document.querySelector('.time-to-sale__timer').dataset.timestamp
    const dayElement = document.getElementById('days')
    const hourElement = document.getElementById('hours')
    const minuteElement = document.getElementById('minutes')
    const secondElement = document.getElementById('seconds')


    const intervalID = setInterval(() => {
        const now = new Date().getTime()
        const distance = timestampToSale - now;
        
        if (distance < 0) {
            dayElement.innerText = 0
            hourElement.innerText = 0
            minuteElement.innerText = 0
            secondElement.innerText = 0
            
            clearInterval(intervalID)
            return
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        dayElement.innerText = days < 10 ? `0${days}` : days
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        hourElement.innerText = hours < 10 ? `0${hours}` : hours
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        minuteElement.innerText = minutes < 10 ? `0${minutes}` : minutes
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        secondElement.innerText = seconds < 10 ? `0${seconds}` : seconds
    }, 1000)
}


const sliderThumbProduct = () => {
    const thumbWrapper = document.querySelectorAll('.product-item__thumb')

    thumbWrapper.forEach(wrapper => {
        const images = wrapper.querySelectorAll('.product-item__image')
        const imagesLength = images.length
        const nextBtn = wrapper.querySelector('.next-img')
        const prevBtn = wrapper.querySelector('.prev-img')

        images[0].classList.add('show')
        if (imagesLength === 1) {
            return
        }

        wrapper.addEventListener("mouseover", () => {
            images.forEach(image => {
                image.classList.remove('show')
            })
            images[1].classList.add('show')
        })

        wrapper.addEventListener("mouseout", () => {
            images.forEach(image => {
                image.classList.remove('show')
            })
            images[0].classList.add('show')
        })

        nextBtn.addEventListener('click', () => {
            for(let i = 0; i < imagesLength; i++) {

                if (images[i].classList.contains('show')) {
                    images[i].classList.remove('show')

                    if (i === imagesLength - 1) {
                        images[0].classList.add('show')
                        break
                    }

                    images[i + 1].classList.add('show')
                    break
                }
            }
        })

        prevBtn.addEventListener('click', () => {
            for(let i = 0; i < imagesLength; i++) {

                if (images[i].classList.contains('show')) {
                    images[i].classList.remove('show')

                    if (i === 0) {
                        images[imagesLength - 1].classList.add('show')
                        break
                    }

                    images[i - 1].classList.add('show')
                    break
                }
            }
        })
    })
}

const handleScrollDisplayHeader = () => {
    const headerElement = document.getElementById('header')
    let positionLast = 0

    window.addEventListener('scroll', function() {
        const currentPosition = this.scrollY

        if (currentPosition > positionLast) {
            headerElement.style.top = '-100%'
        } else {
            headerElement.style.top = '0'
        }

        positionLast = currentPosition
    })
}

function getContentWidth(element) {
    var styles = getComputedStyle(element)
  
    return element.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight)
}


const start = () => {
    timelineCarousel()
    timerToSale()
    sliderThumbProduct()
    handleScrollDisplayHeader()
}

start()