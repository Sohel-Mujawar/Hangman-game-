'use strict';

var resultElem = {},
    currentStatus = {},
    selectedWord = '',
    numberOfTries = 0,
    numberOfFound = 0,
    totalRights = 7;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function check() {
    var currentValue = this.textContent,
        found = false;

    for (var index = 0, length = selectedWord.length; index < length; index++) {
        if (selectedWord[index] == currentValue) {
            document.getElementsByTagName('input')[index].value = currentValue;
            found = true;
            numberOfFound++;
        }
    }

    if (numberOfFound == selectedWord.length) {
        resultElem.textContent = 'Congratulations !!!';
        return disableButtons(document.getElementsByTagName('button'));
    }

    this.disabled = true;

    if (found === false) {
        numberOfTries++;
        currentStatus.src = 'img/status_' + numberOfTries + '.gif';

        var resultText = 'Tried ' + numberOfTries + ' times.'
        resultText += '<br />';
        resultText += 'You have ' + (totalRights - numberOfTries) + ' remaining.';
        resultElem.innerHTML = resultText;

        if (numberOfTries == totalRights) {
            disableButtons(document.getElementsByTagName('button'));
        }
    }
}

function disableButtons(buttons) {
    for (var index = 0, length = buttons.length; index < length; index++) {
        buttons[index].disabled = true;
    }
}

function initElement() {
    resultElem = document.getElementById('results');
    currentStatus = document.getElementById('current-status');

    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var words = ['Linux', 'Ubantu', 'Kali', 'Kalilinux', 'Windows', 'Macos', 'Android'];
    var position = randomNumber(0, words.length);
    selectedWord = words[position].toUpperCase();

    var inputFragment = document.createDocumentFragment();
    for (var index = 0, length = selectedWord.length; index < length; index++) {
        var newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.maxLength = 1;
        newInput.readOnly = true;
        inputFragment.appendChild(newInput);
    }
    document.getElementById('inputs').appendChild(inputFragment);

    var buttonFragment = document.createDocumentFragment();
    for (var index = 0; index < alphabet.length; index++) {
        var newButton = document.createElement('button');
        newButton.textContent = alphabet[index];
        newButton.addEventListener('click', check);
        buttonFragment.appendChild(newButton);
    }
    document.getElementById('buttons').appendChild(buttonFragment);
}

function init() {
    initElement();

    // Refresh button functionality
    var refreshButton = document.getElementById('refresh-button');
    refreshButton.addEventListener('click', function() {
        location.reload();
    });
}

window.addEventListener('DOMContentLoaded', init);


/*global TweenMax, TimelineMax, Power1, Power2*/

/*
author: Marco Barría
devDependencies:
  - GSAP TweenMax https://greensock.com/tweenmax (Necessary for animation.)
*/

// MOBILE DETECT, RANDOM FUNCTION
var Utils = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (Utils.Android() || Utils.BlackBerry() || Utils.iOS() || Utils.Opera() || Utils.Windows());
    },
    randomInRange: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

var $borders = [].slice.call(document.querySelectorAll('.border-inner'), 0),
    wrapperRombo = document.getElementById('wrapper'),
    control = document.getElementById('control'),
    colors = ['#df3891', '#fff78b', '#692286', '#c4a66b', '#ed95c0', '#6ac1b8'],
    nRombo = 46,
    timer = 0.8;

var setObj = function setObj() {

    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
    var heightIOs = window.innerHeight * zoomLevel;

    if (Utils.iOS()) {

        if (heightIOs > window.innerWidth) {
            document.querySelector('.Main').style.height = heightIOs + 'px';
            document.querySelector('.Main').style.minHeight = heightIOs + 'px';
        }

    }

    TweenMax.set(document.querySelectorAll('.border-inner')[0], {
        y: -32
    });
    TweenMax.set(document.querySelectorAll('.border-inner')[1], {
        y: 32
    });
    TweenMax.set(document.querySelectorAll('.border-inner')[2], {
        x: -32
    });
    TweenMax.set(document.querySelectorAll('.border-inner')[3], {
        x: 32
    });

};

var border = function border() {
    var tl = new TimelineMax();

    tl.to($borders, 1.8, {
        x: 0,
        y: 0,
        force3D: true,
        ease: Power1.easeOut,
        onComplete: function() {
            document.body.classList.remove('overflow');
        }
    });

    return tl;
};

var romboInit = function romboInit() {

    for (var i = 0; i < nRombo; i++) {

        var gridItem = document.createElement('div');
        var romboDiv = document.createElement('div');

        wrapperRombo.appendChild(gridItem);
        gridItem.className = "box";

        TweenMax.set(".box", {
            perspective: 600,
            transformOrigin: '50% 50%'
        });

        document.querySelectorAll('.box')[i].appendChild(romboDiv);
        romboDiv.className = "rombo";

        TweenMax.set(".rombo", {
            transformStyle: "preserve-3d"
        });

        if (Utils.any()) {

            TweenMax.set(document.querySelectorAll('.rombo')[i], {
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                top: Utils.randomInRange(-40, 40),
                left: Utils.randomInRange(-40, 40),
                y: 0,
                scale: 0,
                opacity: 0,
                transformOrigin: '50% 50%',
                rotationY: Utils.randomInRange(-720, 720),
                rotation: Utils.randomInRange(-320, 320)
            });

        } else {

            TweenMax.set(document.querySelectorAll('.rombo')[i], {
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                top: Utils.randomInRange(-180, 180),
                left: Utils.randomInRange(-180, 180),
                y: -100,
                scale: 0,
                opacity: 0,
                transformOrigin: '50% 50%',
                rotationY: Utils.randomInRange(-720, 720),
                rotation: Utils.randomInRange(-320, 320)
            });

        }

    }

};

var romboAnimation = function romboAnimation() {
    var romboTodo = [].slice.call(document.querySelectorAll('.rombo'), 0);
    var tl = new TimelineMax();

    tl.staggerTo(romboTodo, 1.2, {
        y: 0,
        scale: 1,
        opacity: 1,
        rotationY: 0,
        rotation: '+=240',
        force3D: true,
        ease: Power2.easeOut
    }, 0.08);

    return tl;
};

var init = function init() {

    setObj();
    romboInit();

    // MASTER SCENES

    var master = new TimelineMax({
        delay: 0.4
    });

    master.add(border(), "scene1")
        .add(romboAnimation(), "-=1.8", "scene2");
    master.timeScale(timer);

    function go(el) {
        master.play();
        master.timeScale(timer);
        el.textContent = "REVERSE";
    }

    function rewards(el) {
        master.reverse();
        master.timeScale(timer * 5);
        el.textContent = "PLAY";
    }

    control.onclick = function() {
        master.reversed() ? go(this) : rewards(this);
        return false;
    };

};

window.onload = init;