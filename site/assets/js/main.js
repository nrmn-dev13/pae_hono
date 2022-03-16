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

  // chart monitoring oximeter

  Chart.pluginService.register({
    beforeDraw: function (chart, easing) {
      if (chart.config.options.fillColor) {
        var ctx = chart.chart.ctx;
        var chartArea = chart.chartArea;
        ctx.save();
        let delta = 0;
        const chartHeight = chartArea.bottom - chartArea.top;
        const bottomBarHeight = chart.height - chartHeight - chartArea.top;
        chart.config.options.fillColor.map((color) => {
          const colorHeight = chartHeight * (color[0] / 100);
          const colorBottom = chartArea.bottom + colorHeight;
          ctx.fillStyle = color[1];

          const x = chartArea.left,
            y = chart.height - bottomBarHeight - colorHeight - delta,
            width = chartArea.right - chartArea.left,
            height = colorHeight;

          delta += height;
          ctx.fillRect(x, y, width, height);
          ctx.restore();
        });
      }
    },
  });

  const dataSp02 = {
    labels: ["", "Morning", "Afternoon", "Night", ""],
    datasets: [
      {
        label: "value",
        borderColor: "black",
        data: [null, 93, 96, 98, null],
      },
    ],
  };

  const ctx = document.getElementById("sp02-chart").getContext("2d");
  const sp02 = new Chart(ctx, {
    type: "line",
    data: dataSp02,
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 100,
              stepSize: 45,
            },
          },
        ],
      },
      legend: { display: false },
      fillColor: [
        [91, "rgba(255,99,132,1)"],
        [4, "rgba(255, 206, 86, 0.2)"],
        [5, "rgba(75, 192, 192, 1)"],
      ],
    },
  });

  const dataTemperature = {
    labels: ["", "Morning", "Afternoon", "Night", ""],
    datasets: [
      {
        label: "value",
        borderColor: "black",
        data: [null, 34, 34, 34, null],
      },
    ],
  };

  const ctxTemperature = document
    .getElementById("temperature-chart")
    .getContext("2d");
  const temperature = new Chart(ctxTemperature, {
    type: "line",
    data: dataTemperature,
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 60,
              stepSize: 15,
            },
          },
        ],
      },
      legend: { display: false },
      fillColor: [
        [40, "rgba(153, 102, 255, 0.2)"],
        [20, "rgba(75, 192, 192, 1)"],
        [40, "rgba(255,99,132,1)"],
      ],
    },
  });

  const dataPulse = {
    labels: ["", "Morning", "Afternoon", "Night", ""],
    datasets: [
      {
        label: "value",
        borderColor: "black",
        data: [null, 110, 95, 92, null],
      },
    ],
  };

  const ctxPulseRate = document
    .getElementById("pulse-rate-chart")
    .getContext("2d");
  const pulse = new Chart(ctxPulseRate, {
    type: "line",
    data: dataPulse,
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 50,
              max: 130,
              stepSize: 40,
            },
          },
        ],
      },
      legend: { display: false },
      fillColor: [
        [60, "rgba(75, 192, 192, 1)"],
        [20, "rgba(255, 206, 86, 0.2)"],
        [20, "rgba(255,99,132,1)"],
      ],
    },
  });
});
