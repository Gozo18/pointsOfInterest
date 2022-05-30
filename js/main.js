jQuery(document).ready(function ($) {
  $.getJSON("./json/points.json", function (data) {
    let arr = $.map(data, function (item) {
      let boxClass = `pointsBox${item.id}`;
      $(".container").append(
        `<div class="productWrapper"><img src="${item.url}" alt="Preview image" /><ul class=${boxClass}></ul></div>`
      );
      let points = $.map(item.points, function (point) {
        var stock;
        if (point.product.stock < 1) {
          stock = "Není skladem";
        } else {
          stock = "Skladem";
        }
        $(`.${boxClass}`).append(
          `<li class="singlePoint" style="top:${point.top}%; left:${point.left}%">
            <a class="imgReplace" href="#0">Více</a>
            <div class="moreInfo ${point.oriented}">
              <h2>${point.product.name}</h2>
              <div class="pointImage">
                <img src="${point.product.image}" alt="Preview image" />
              </div>
              <div class="pointText">
                <p>${point.product.price} ${point.product.currency}</p>
                <p>${stock}</p>
              </div>
              <a href=${point.product.url} class="detailButton">Detail</a>
              <a href="#0" class="closeInfo imgReplace">Zavřít</a>
            </div>
          </li>`
        );
      });
    });
    $(".singlePoint")
      .children("a")
      .on("click", function (e) {
        e.preventDefault();
        var selectedPoint = $(this).parent("li");
        if (selectedPoint.hasClass("isOpen")) {
          selectedPoint.removeClass("isOpen").addClass("visited");
        } else {
          $(".singlePoint").removeClass("isOpen");
          selectedPoint
            .addClass("isOpen")
            .siblings(".single-point.isOpen")
            .removeClass("isOpen")
            .addClass("visited");
        }
      });
    $(".closeInfo").on("click", function (event) {
      event.preventDefault();
      $(this)
        .parents(".singlePoint")
        .eq(0)
        .removeClass("isOpen")
        .addClass("visited");
    });
  }).fail(function () {
    console.log("An error has occurred.");
  });
});
