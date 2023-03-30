// Chick If There's Local Storage Color Option
let mainColor = localStorage.getItem("color_option")

// Save The imge click Is no
let saveSource ;

if(mainColor !== null){
    document.documentElement.style.setProperty('--main-color' , mainColor)
   
    // Remove Active Class From All Childen
    document.querySelectorAll('.colors-list li').forEach(element =>{
        element.classList.remove('active')
        
        // Add Active Class On the Element data-set === local
        if(element.dataset.color === mainColor){            
            element.classList.add('active')
        }
    })
}


document.querySelector('.icon-setting i').onclick = function(){
    
    // Toggle Spin Class On Icon
    this.classList.toggle('fa-spin')
    
    // Toggle Open Class On Element
    document.querySelector(".setting-page").classList.toggle('open')

}

// Switch Colors

let colorsLi = document.querySelectorAll(".colors-list li")
// Loop On All List Colors
colorsLi.forEach(li => {
    // Click On Event List Item
    li.addEventListener("click" , (e)=>{
        console.log(e.target.dataset.color)
        // Set Color On Root
        document.documentElement.style.setProperty('--main-color' , e.target.dataset.color)
        
        // Set Color On Local Storage
        localStorage.setItem("color_option" , e.target.dataset.color)
        
        handleActive(e)
    })
})
// Get Landing Page 
let landingPage = document.querySelector(".landing-page")

//  Images Click
let imgs = document.querySelectorAll(".imgs-box img")

// Random Background Option
let backgroundOption = true

// Var To Control the Interval
let backgroundInterval;

// Chick If There's Local Storage background Option
let backgroundLocalItem = localStorage.getItem('background_option')
// Click The imgs 
let background = localStorage.getItem('background')

if(backgroundLocalItem !== null){
    // Loop To remove Active Class
    document.querySelectorAll(".random-background span").forEach(span=>{
        span.classList.remove('active')
    })
    if(backgroundLocalItem == "true"){
        backgroundOption = true;
        document.querySelector('.random-background .yes').classList.add('active')
    }else{
        backgroundOption = false; 
        document.querySelector('.random-background .no').classList.add('active')
        document.querySelector('.setting-page .imgs-box').style.pointerEvents = 'all';
        // Click The imgs Local Storage
        if(background !== null){
            console.log(background)
            landingPage.style.backgroundImage = `url('img/${background}')`;
            imgs.forEach(img => {
                if(img.dataset.img === background){
                    img.classList.add('active')
                }
            })   
        }
    }

}

// Switch Random Background
let randomBackground = document.querySelectorAll(".random-background span")
// Loop On All Spans
randomBackground.forEach(span => {
    // Click On Event Span
    span.addEventListener("click" , (e)=>{
        handleActive(e)
        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImgs()
            // Local Storage Set
            localStorage.setItem('background_option' , true);
            // Add Pointer Events = none
            document.querySelector('.setting-page .imgs-box').style.pointerEvents = 'none';
            // Add Class Not Active Place Active
            document.querySelector('.setting-page .imgs-box img.active').className = 'not-active';
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval)
            // Local Storage Set Yes Or No
            localStorage.setItem('background_option' , false);
            // Remove Pointer Events = none
            document.querySelector('.setting-page .imgs-box').style.pointerEvents = 'all';
            // Add Class Active Place Not Active
            document.querySelector('.setting-page .imgs-box img.not-active').className ='active';
            // Change BackGround To Img Active
            landingPage.style.backgroundImage = `url('img/${document.querySelector('.setting-page .imgs-box img.active').dataset.img}')`;
        }
        })
})

// Create Array To imgs
let arrayImg = ['01.jfif','02.jfif','03.jfif','04.jfif','05.jfif']


function randomizeImgs(){
    if(backgroundOption){
       backgroundInterval = setInterval(()=>{
            // Get Random Number From Array    
            let randomNumber = Math.floor(Math.random() * arrayImg.length);
            
            // Change Background Image Landing Page
            landingPage.style.backgroundImage = 'url("img/'+arrayImg[randomNumber] +'")' // متخفش يعني `arrayImg[randomNumber]` زي ده '+arrayImg[randomNumber] +' الشكل ده  
            
        }, 5000)
    }
}

randomizeImgs()


// Loop On All Imgs
imgs.forEach(img => {
    // Click On Event Img
    img.addEventListener("click" , (e)=>{
        handleActive(e)
        // console.log(e.target.dataset.img)
        if(backgroundOption === false){
            // Change Background Is Active
            landingPage.style.backgroundImage = `url('img/${e.target.dataset.img}')`   
        }
        // Local Storage Set Background
        localStorage.setItem('background' , e.target.dataset.img);

    })
})

// localStorage.clear()

// Select Skills

let ourSkills = document.querySelector(".our-skill")

window.onscroll = function(){
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    // Skills Outer Height
    let skillOuterHeight = ourSkills.offsetHeight;
    // Window Height
    let windowHeight = this.innerHeight
    // Window Scroll Top
    let windowScrollTop = this.pageYOffset

    if(windowScrollTop > (skillsOffsetTop + skillOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span')
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })
    }else{
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span')
        allSkills.forEach(skill =>{
            skill.style.width = 0
        })
        
    }
}


// Create Popup With The Img

let ourGallery = document.querySelectorAll('.gallery .images-box img')

ourGallery.forEach(img=>{
    img.addEventListener('click' , (e)=>{
        // Create Ovarlay
        let overlay = document.createElement('div')
        overlay.className = 'popup-overlay'
        document.body.appendChild(overlay)
        
        // Create Popup Box
        let popupBox = document.createElement('div')
        popupBox.className = 'popup-box'
        if(img.alt !== null){
            // Create Img Header
            let imgHeading = document.createElement('h3')
            // Create Img Text
            let imgText = document.createTextNode(img.alt)
            imgHeading.appendChild(imgText)
            popupBox.appendChild(imgHeading)
        }
        // Create Popup Img
       let popupImg = document.createElement('img')
       popupImg.src = img.src;
       popupBox.appendChild(popupImg)
       document.body.appendChild(popupBox)
       // Create Close Button    
       let closeButton = document.createElement("span")
       closeButton.className = 'close-button'
       let closeButtonText = document.createTextNode('X')
       closeButton.appendChild(closeButtonText)
       popupBox.appendChild(closeButton)
    })
})
// Close Popup
document.addEventListener('click' , function(e){
    if(e.target.className === 'close-button'){
    // Remove Popup Box 
    e.target.parentNode.remove()
    // Remove Ovarlay 
    document.querySelector('.popup-overlay').remove()
   }
})


// Create Bullets Daynmc
let allLinks = document.querySelectorAll('.links a')
let navBullets = document.querySelector('.nav-bullets')

for(let i =0 ; i< allLinks.length ; i++){
    let bulletDaynmc = document.createElement('div')
    bulletDaynmc.className = 'bullet'
    bulletDaynmc.dataset.section = `${allLinks[i].dataset.section}`
    navBullets.appendChild(bulletDaynmc)
    let tooltipDaynmc = document.createElement('div')
    tooltipDaynmc.className = 'tooltip'
    tooltipDaynmc.innerHTML = allLinks[i].innerHTML
    bulletDaynmc.appendChild(tooltipDaynmc)
}


// Select All Bullets
let allBullets = document.querySelectorAll('.nav-bullets .bullet')

function ScrollToSomewhare(elements){
    elements.forEach(ele =>{
      ele.addEventListener('click' , function(e){
        e.preventDefault()
        document.querySelector(e.target.dataset.section).scrollIntoView({behavior :"smooth"})
      });
    });
}

ScrollToSomewhare(allBullets)
ScrollToSomewhare(allLinks)

// Handle Active State
function handleActive(ev){
    // Remove Active Class From All Childen
    ev.target.parentElement.querySelectorAll('.active').forEach(element =>{
        element.classList.remove('active')
    })

    // Add Active Class On Salf
    ev.target.classList.add('active')
}


// Show Or Hidden The Bullets

let bulletsOptionSpan = document.querySelectorAll('.bullets-option span') 

let bulletLocalItem = localStorage.getItem('bullets_option')
if(bulletLocalItem !== null){
    bulletsOptionSpan.forEach(span=>{
        span.classList.remove('active')
    })
   if(bulletLocalItem === 'block'){
       navBullets.style.display = 'block'
       document.querySelector('.bullets-option .yes').classList.add('active')
    }else{
        navBullets.style.display = 'none'
        document.querySelector('.bullets-option .no').classList.add('active')
        
   }
}
bulletsOptionSpan.forEach(span=>{
    span.addEventListener('click' , function(e){
        if(span.dataset.display == 'block'){
            navBullets.style.display = 'block'
            localStorage.setItem('bullets_option' , 'block')
        }else{
            navBullets.style.display = 'none'
            localStorage.setItem('bullets_option' , 'none')
        }
        handleActive(e)
    })
})

document.querySelector('.reset-option').onclick = function(){
    // ده هيمسح كل الي في اللوكل استورج
    localStorage.clear()
    // ده لو انت عاوز تحدد علشان لو فيه حاجه في اللوكل استورج ملهاش علاقه بالستينج ميمسحاش ويمسح الي انت تختاره
    // localStorage.removeItem('bullets_option')
    // localStorage.removeItem('color_option')
    // localStorage.removeItem('background_option')
    // localStorage.removeItem('background')

    window.location.reload()
}


let toggleBtn = document.querySelector('.toggle')
let links = document.querySelector('.links')

toggleBtn.addEventListener('click' , function(e){
    e.stopPropagation()
    toggleBtn.classList.toggle('menu-active');
    links.classList.toggle('open')
})

document.addEventListener('click' , function(e){
    if(e.target.className !== links.className && e.target.className !== toggleBtn.className){
        toggleBtn.classList.remove('menu-active');
        links.classList.remove('open')          
    }
    
})

links.onclick = function(e){
    e.stopPropagation() // ده الي بتخلي لو العنصر الاب جواه ابناء يكونوا زيه يعني لو مشي علي الأب حاجه هتكون علي الابناء وشيلها وشوف ايه الي هيحصل 
}

// e.stopPropagation() ده كانت بتقوم بي مهمت 
// let toggleBtnSpan = document.querySelector('.toggle span')
// toggleBtnSpan.forEach(span=>{
//     span.addEventListener("click" , function(e){
//         e.target.className
//         // وبعدين احطه في متغير علشان احطه في الاف كوندشن الي فوق واقارنه في الكلاس بتاع الشيء الي بظغط عليه
//     }
// })