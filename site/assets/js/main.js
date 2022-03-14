$(document).ready(function () {
  function handleGuideStep() {
    $("#onboardingStep").steps({
      transitionEffect: "slideLeft",
    });
  }
  function handleToggleNav() {
    // Toggle sidenav
    $(".toggle--nav").click(function () {
      $(".sidebar").toggleClass("show--nav");
    });
    $(".sidebar__item").click(function () {
      $(".sidebar").removeClass("show--nav");
    });
    $(".backdrop").click(function () {
      $(".sidebar").removeClass("show--nav");
    });
    // Radio Button Event
    $("input.form-control--support:radio").change(function () {
      if (this.value == "yes") {
        $(".invitation-wrapper").addClass("active");
      } else {
        $(".invitation-wrapper").removeClass("active");
      }
    });
    $("input.form-control--hauora:radio").change(function () {
      if (this.value == "yes") {
        $(".organize-wrapper").addClass("active");
      } else {
        $(".organize-wrapper").removeClass("active");
      }
    });
    // Toggle password
    $(".icon--password").click(function () {
      var password = $(this).prev(".form-control--password");
      $(this).toggleClass("fas fa-eye fas fa-eye-slash");
      if (password.attr("type") === "password") {
        password.attr("type", "text");
      } else {
        password.attr("type", "password");
      }
    });
  }
  function handleReadMore() {
    $(".button--read-more").click(function () {
      if ($(this).closest(".alert").hasClass("expanded")) {
        $(this).html("Read More");
      } else {
        $(this).html("Less");
      }
      $(this).closest(".alert").toggleClass("expanded");
    });
  }
  function handleCheckall() {
    $("#whare-kit").click(function () {
      $(".check-whare:checkbox").not(this).prop("checked", this.checked);
    });
    $("#medicine-kit").click(function () {
      $(".check-medicine:checkbox").not(this).prop("checked", this.checked);
    });
    $("#suplement-list").click(function () {
      $(".check-suplement:checkbox").not(this).prop("checked", this.checked);
    });
  }
  function handleCloseAlert() {
    $(".icon--close-alert").click(function () {
      $(".alert").addClass("close");
    });
  }
  function handleSlider() {
    $(".slider--dashboard").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      prevArrow: $(".prev-arrow"),
      nextArrow: $(".next-arrow"),
      mobileFirst: true,
      infinite: false,
      responsive: [
        {
          breakpoint: 768,
          settings: "unslick",
        },
      ],
    });
  }
  handleGuideStep();
  handleToggleNav();
  handleReadMore();
  handleCheckall();
  handleCloseAlert();
  handleSlider();

  window.addEventListener("resize", createOffsets);

  function createOffsets() {
    const swiper = $(".swiper-custom");
    const card = $(".card-custom");
    const mqLarge = window.matchMedia(
      "(min-width: 768px) and (max-width: 1024px)"
    );

    if (swiper && mqLarge.matches) {
      $(".swiper").slick({
        arrows: false,
        centerPadding: "1em",
        infinite: false,
        lazyLoad: "ondemand",
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 760,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 360,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
      swiper.addClass("swiper");
      card.addClass("m-1");
    } else {
      $(".swiper").destroy(true, true);
      swiper.removeClass("swiper");
      card.removeClass("m-1");
    }
  }

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let today = new Date();
  let time = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  const hh = addZero(today.getHours());
  const minutes = today.getMinutes();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  time = `${hh}:${minutes}`;
  $(".date-monitoring").val(today);
  $(".time-monitoring").val(time);

  $(".no-symptoms").click(() => {
    $(this).find(".check-wrapper").toggleClass("card-disabled");
    $(this)
      .find(".form-control--check")
      .attr(
        "disabled",
        $(this).find(".form-control--check").attr("disabled") === "disabled"
          ? false
          : true
      );
  });
});
