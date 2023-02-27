function detectWebpSupport() {
    var canvas = document.createElement('canvas');
    if (!!(canvas.getContext && canvas.getContext('2d'))) {
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    } else {
        return false;
    }
}

$(document).ready(function(){
  $(".background-cover").each(function (index) {
    const webpCon = (Url) => {
      const ext = Url.split(".").pop();
      const extTrue = ext.length <= 4;
      return (bgImageUrl = extTrue
        ? Url.replace("." + ext, ".webp")
        : Url + ".webp");
    };

    const desktopUrl = $(this).data("img-desktop");
    const mobileUrl = $(this).data("img-mobile");
    const tabUrl = $(this).data("img-tab") || mobileUrl;
    const isDesk = window.matchMedia("(min-width: 767px)").matches;
    const isTab = window.matchMedia("(min-width: 600px)").matches;
    let bgImageUrl = "";

    if (detectWebpSupport()) {
      if (isDesk) {
        webpCon(desktopUrl);
      } else if (isTab) {
        webpCon(tabUrl);
      } else {
        webpCon(mobileUrl);
      }
    } else {
      bgImageUrl = isDesk ? desktopUrl : isTab ? tabUrl : mobileUrl;
    }

    $(this).css("background-image", `url(${bgImageUrl})`);
  });
});
