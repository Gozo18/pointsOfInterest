jQuery(document).ready(function ($) {
  /* Načtení JSONu a append POI do obrázků */
  $.getJSON("./json/points.json", function (data) {
    let arr = $.map(data, function (item) {
      let boxClass = `poi-pointsBox${item.id}`;
      $(".container").append(
        `<div class="poi-imageWrapper"><img src="${item.url}" alt="Preview image" /><ul class=${boxClass}></ul></div>`
      );
      let points = $.map(item.points, function (point) {
        var stock;
        if (point.product.stock < 1) {
          stock = "Není skladem";
        } else {
          stock = "Skladem";
        }
        $(`.${boxClass}`).append(
          `<li class="poi-singlePoint" style="top:${point.top}%; left:${point.left}%">
            <a class="poi-imgReplace" href="#0">Více</a>
            <div class="poi-moreInfo ${point.oriented}">
              <h2>${point.product.name}</h2>
              <div class="poi-pointImage">
                <img src="${point.product.image}" alt="Preview image" />
              </div>
              <div class="poi-pointText">
                <p>${point.product.price} ${point.product.currency}</p>
                <p>${stock}</p>
              </div>
              <a href=${point.product.url} class="poi-detailButton">Detail</a>
              <a href="#0" class="poi-closeInfo poi-imgReplace">Zavřít</a>
            </div>
          </li>`
        );
      });
    });

    /* Klik na POI element */
    $(".poi-singlePoint")
      .children("a")
      .on("click", function (e) {
        e.preventDefault();
        var selectedPoint = $(this).parent("li");
        $(".poi-singlePoint.isOpen").addClass("visited");
        if (selectedPoint.hasClass("isOpen")) {
          $(".poi-singlePoint").removeClass("isOpen");
        } else {
          $(".poi-singlePoint").removeClass("isOpen");
          selectedPoint.addClass("isOpen");
        }
      });

    /* Mobilní zavírání */
    $(".poi-closeInfo").on("click", function (event) {
      event.preventDefault();
      $(this)
        .parents(".poi-singlePoint")
        .eq(0)
        .removeClass("isOpen")
        .addClass("visited");
    });

    /* Pro první POI ze všech obrázků */
    $(".poi-singlePoint:first").addClass("isOpen");

    /* Pro první POI každého obrázku */
    /* $(".poi-singlePoint:first-child").addClass("isOpen"); */
  }).fail(function () {
    console.log("An error has occurred.");
  });
});
