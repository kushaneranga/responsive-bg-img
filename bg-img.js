function detectWebpSupport() {
    var canvas = document.createElement('canvas');
    if (!!(canvas.getContext && canvas.getContext('2d'))) {
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    } else {
        return false;
    }
}

function convertToWebp(imageElement) {
    const ext = imageElement.split('.').pop();
    const extTrue = ext.length <= 4;
    return (extTrue) ? imageElement.replace('.' + ext, '.webp') : imageElement + '.webp';
}

function dataGetter(element) {
    console.log('SS',element);
    const src = element.getAttribute('data-src');
    const desktopUrl = element.getAttribute('data-img-desktop');
    const tabUrl = element.getAttribute('data-img-tab');
    const mobileUrl = element.getAttribute('data-img-mobile');

    const mainCall = () => {
        var bgImageUrl = loadBackgroundImage(src, desktopUrl, tabUrl, mobileUrl);
        element.style.backgroundImage = 'url(' + bgImageUrl + ')';
    }

    mainCall();

    // Add resize listener
    window.addEventListener('resize', function () {
        mainCall();
    });
}

function loadBackgroundImage(src, desktopUrl, tabUrl, mobileUrl) {
    const isDesk = window.matchMedia('(min-width: 767px)').matches;
    const isTab = window.matchMedia('(min-width: 575px)').matches;

    const handleResize = () => {
        if (isDesk) {
            return desktopUrl;
        } else if (isTab) {
            return tabUrl;
        } else {
            return mobileUrl;
        }
    }

    if (detectWebpSupport()) {
        return convertToWebp(handleResize());
    } else {
        return handleResize();
    }
}

// var backgroundElements = document.querySelectorAll('.background-cover');
// // console.log(backgroundElements);
// for (var i = 0; i < backgroundElements.length; i++) {
//     dataGetter(backgroundElements[1]);
// }

document.addEventListener("DOMContentLoaded", function() {
    var backgroundElements = document.querySelectorAll(".background-cover");
    backgroundElements.forEach(function (bg, index) {
        dataGetter(backgroundElements[index]);
    });
});