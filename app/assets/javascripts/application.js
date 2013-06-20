// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery.isotope
//= require jquery.transit
//= require_tree .

$(document).ready(function () {
  $("#header").hide();
  var list = $("#list");
  var question_one = "Zou je het heel gek vinden als ik je verkering zou vragen?";
  var question_two = "Wil je met me gaan?";
  var question_one_words = question_one.split(" ");
  var question_two_words = question_two.split(" ");

  $.each(question_one_words, function (index, obj) {
    list.append($('<div class="item curved q-one ' + randomColor() + '">' + obj + "</div>"));
  });

  $.each(question_two_words, function (index, obj) {
    list.append($('<div class="item curved q-two ' + randomColor() + '">' + obj + "</div>"));
  });

  list.isotope({
    itemSelector: '.item',
    filter: '.q-one'
  });

  list.isotope('shuffle');

  $(document).on('mouseover', ".item", function () {
    $(this).transition({
      opacity: 0.2
    }, 200, 'easeInOutQuad', function () {
      setTimeout(function () {
        list.isotope('reLayout');
      }, 100);
    });

  });
  $(document).on('mouseleave', ".item", function () {
    $(this).transition({
      opacity: 1
    }, 200, 'easeInOutQuad', function () {
      setTimeout(function () {
        list.isotope('reLayout');
      }, 100);
    });
  });

  $("#nee").on("click", updateQuestion);

  $("#ja").on("mouseover", function (event) {
    list.isotope('shuffle');
  });
});

function randomColor() {
  var colors = ["dark-red", "medium-dark-red", "medium-red", "medium-ligth-red", "light-red"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function updateQuestion() {
  var list = $("#list");
  list.isotope({
    filter: ".q-two"
  });
  list.isotope({
    sortBy: 'original-order'
  });
  $("#nee").off("click");
  $("#nee").on("click", shuffle);
  $("#ja").off("mouseover");
  $("#ja").off("click");
  $("#ja").on("click", complete);
}

function shuffle() {

  var list = $("#list");
  list.isotope('shuffle');
}

function complete() {
  $("#buttons").slideUp();
  $("#header").slideDown();
  $("#meer").on("click", addMoreLove);
  $("#list").isotope('remove', $(".item"), addMoreLove);
}

function getRandomLoveWord() {
  var love_words = "lief aardig schattig sexy dirty wild liefdevol lekker zoet uniek kleurvol actief uitstekend ♥ wit gek";
  var words = love_words.split(" ");
  return words[Math.floor(Math.random() * words.length)];
}

function addMoreLove() {
  var list = $("#list");
  var word = getRandomLoveWord();
  list.isotope({
    filter: ".love-word"
  });
  list.isotope("insert", $('<div class="item curved love-word ' + randomColor() + '">' + word + "</div>"));
}