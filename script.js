let playing = false;
let score;
let trialsLeft;
let fruits = ['apple', 'banana', 'cherry', 'grape', 'mango', 'orange', 'peach', 'pear', 'pineapple', 'watermelon'];
let step;
let action;

$(document).ready(function() {
    $('#start-reset').click(function() {
        if (playing == true) {
            location.reload();
        } else {
            playing = true;
            $('#gameover').hide();

            score = 0;
            $('#score-value').html(score);

            $('#trials-left').show();
            trialsLeft = 3;
            addHearts();

            $('#start-reset').html('Reset Game');

            startAction();
        }
    })

    $('#fruit1').mouseover(function() {
        score++;
        $('#score-value').html(score)
        $('#slice-sound')[0].play();

        clearInterval(action);

        $('#fruit1').hide('explode', 500);

        setTimeout(startAction, 600)
    })


// Functions ---------------->

    function addHearts() {
        $('#trials-left').empty();
        for (let i = 0; i < trialsLeft; i++) {
            $('#trials-left').append('<img src="images/heart.png" class="life">');
        }
    }

    function startAction() {
        $('#fruit1').show();
        chooseFruit();

        $('#fruit1').css({'left': Math.round(Math.random() * 550), 'top': -50});
        step = Math.round(Math.random() * 5) + 1;

        action = setInterval(function() {
            $('#fruit1').css('top', $('#fruit1').position().top + step)
            if ($('#fruit1').position().top > $('#fruits-container').height()) {
                if (trialsLeft > 1) {
                    $('#fruit1').show();
                    chooseFruit();

                    $('#fruit1').css({'left': Math.round(Math.random() * 550), 'top': -50});
                    step = Math.round(Math.random() * 5) + 1;

                    trialsLeft--;
                    addHearts();
                } else {
                    playing = false;

                    $('#start-reset').html('Start Game');

                    $('#gameover').show();
                    $('#gameover').html(`<p>Game Over!</p><p>Your score is ${score}.</p>`);

                    $('#trials-left').hide();

                    stopAction();
                }
            }
        }, 10)
    }

    function chooseFruit() {
        $('#fruit1').attr('src', `images/${fruits[Math.round(Math.random() * 8)]}.png`);
    }

    function stopAction() {
        clearInterval(action);
        $('#fruit1').hide();
    }
})