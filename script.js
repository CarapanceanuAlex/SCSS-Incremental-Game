let count = 0;
let increment = 1000; //cu cat creste count-ul
let unlockValueAdd1 = 10; //valoare initila pentru a da unlock la add +1
let unlockValueAutoClickUpgrade = 300; //valoare initiala pentru a upgrada auto click ul
let autoAddInterval = null; // stocam ID intervalului ca sa il putem opri/reseta mai incolo
let autoClickDelay = 2000; //initial auto click ul se intampla la 2 secunde = 2000 milisecunde
let autoClickButtonClicked = false;
let price = 0; //cat costa un upgrade
let unlockValueMultiplyIncrement = 200; //valoarea initiala la care putem inmultii cu 20 incrementul
const minDelayValue = 50; //50 de milisecunde ca sa nu moara animatia cu dolarul
let numberInLetters = document.getElementById("numberInLetters");
const countDisplay = document.getElementById("count");
const clickMeBut = document.getElementById("clickMeButton");
const addOneButton = document.getElementById("addOneButton");
const autoClickButton = document.getElementById("autoClickButton");
const autoClickUpgradeButton = document.getElementById("autoClickUpgradeButton");
const multiplyIncrementButton = document.getElementById("multiplyIncrementButton");

function updateCountDisplay() {
    countDisplay.textContent = count + " $";
}

setInterval(function() { // apar butoanele daca conditiile sunt ok
    if (count >= unlockValueAdd1) {
        addOneButton.classList.add('visible');  // Show +1 button
    }

    if (count >= 100 && !autoClickButtonClicked) {
        autoClickButton.classList.add('visible');  // Show Auto-Click button
    }

    if (count >= unlockValueAutoClickUpgrade) {
        autoClickUpgradeButton.classList.add('visible');  // Show Upgrade button
    }

    if (count >= unlockValueMultiplyIncrement) {
        multiplyIncrementButton.classList.add('visible');  // Show Multiply Increment button
    }
}, 100);  // facem un check la 100ms 

clickMeBut.addEventListener("click", function()
    {
        count += increment;
        updateCountDisplay();
        fallingImage();
    }
)

function fallingImage() {
    const images = [
        "photos/poro1.png",
        "photos/poro2.png",
        "photos/poro3.png",
        "photos/poro4.png"
    ]
    //aici se creeaza imaginea care cade
    const fallingImage = document.createElement("img");
    fallingImage.className = "falling-image";

    //aici selectam o image random din array
    const randomImage = images[Math.floor(Math.random() * images.length)];
    fallingImage.src = randomImage;

    //selectam o pozitie random de pe orizontala de unde sa cada
    const randomLeft = Math.random() * 80 + 10; //intre 10% si 90% din latimea ecranului
    fallingImage.style.left = `${randomLeft}%`;

    document.body.appendChild(fallingImage);

    // aici facem sa dispara imaginea
    setTimeout(() => {
        fallingImage.remove();
    }, 4000); 
}

addOneButton.addEventListener("click", function()
    {
        price = 5;
        count -= price;
        increment++;
        unlockValueAdd1 *= 2;
        updateCountDisplay();
        addOneButton.classList.remove('visible');
    }
)

autoClickButton.addEventListener("click", function()
    {
        count = 0;
        updateCountDisplay();
        if (!autoAddInterval){
            autoAddInterval = setInterval(function() 
                {   
                    count += increment;
                    updateCountDisplay();
                    fallingImage();
                }, autoClickDelay)
        } autoClickButton.classList.remove('visible'); autoClickButtonClicked = true;
    }
)

autoClickUpgradeButton.addEventListener("click", function()
    {   
        
        unlockValueAutoClickUpgrade *= 2.5;
        if (autoClickDelay > minDelayValue)
        {
            autoClickDelay /= 1.3;
        } else {
            autoClickUpgradeButton.classList.remove('visible');
            autoClickDelay = minDelayValue;
        }

        price = 120;
        count -= price;
        updateCountDisplay();

        clearInterval(autoAddInterval); //resetam intervalul deoarece l-ar folosi pe cel vechi
        autoAddInterval = setInterval(function() {
            count += increment;
            updateCountDisplay();
            fallingImage();
        }, autoClickDelay);

        autoClickUpgradeButton.classList.remove('visible');
    }
)

multiplyIncrementButton.addEventListener("click", function()
    {
        unlockValueMultiplyIncrement *= 3.5;
        increment *= 200;
        price = 90;
        count -= price;
        updateCountDisplay();

        multiplyIncrementButton.classList.remove('visible');
    }
)





