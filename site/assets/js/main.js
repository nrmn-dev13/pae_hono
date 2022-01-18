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
    $('.slider--dashboard').slick({
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
           settings: "unslick"
        }
     ]
    });
  }
  handleGuideStep();
  handleToggleNav();
  handleReadMore();
  handleCheckall();
  handleCloseAlert();
  handleSlider();
});
