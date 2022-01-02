var score = 0;
cross = true;
audio=new Audio("music.mp3");
audiogo=new Audio("gameover.mp3");
// setTimeout(()=>{audio.play();},1000);


const start=()=> {
    score=0;
    updateScore(score);
    const hide=document.querySelector('.start')
    hide.style.visibility='hidden';
    
    const dragon = document.querySelector(".obstacle ");
    dragon.classList.add("animateObstacle");
    audio.play();
    document.querySelector('.gameOver').innerHTML="Keep It Up..";
    
}

document.onkeydown = (e) => {
    dino = document.querySelector(".dino");
    console.log("key code is : ", e.keyCode);
    if (e.keyCode == 38) {
        dino.classList.add("animatedino");
        setTimeout(() => {
            dino.classList.remove('animatedino')
        }, 700);
    }

    if (e.keyCode == 39) {
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dx + 120 + 'px';
    }
    if (e.keyCode == 37) {
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dx - 120) + 'px';
    }

}

setInterval(() => {
    dino = document.querySelector('.dino')
    gameOver = document.querySelector('.gameOver')
    obstacle = document.querySelector('.obstacle')

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    console.log(offsetX, offsetY);

    if (offsetX < 90 && offsetY < 62) {
        gameOver.innerHTML = "Game Over ! , Click Start to Play Again";
        obstacle.classList.remove('animateObstacle');
        audiogo.play();
        setTimeout(()=>{
            audiogo.pause();
            audio.pause();
        },1000);
        const hide=document.querySelector('.start')
        hide.innerHTML="Start Again"
        hide.style.visibility='visible';
    }
    else if (cross && offsetX < 100) {
        score = score + 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000)

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500)

    }
}, 10);

function updateScore(score) {
    scorecont = document.getElementById('scorecont');
    scorecont.innerHTML = "Your Score: " + score;
}