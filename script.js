// Определим свои функции добавления/удаления класса, так как те, что в jQuery не работают для SVG
jQuery.fn.myAddClass = function (classTitle) {
  return this.each(function() {
    var oldClass = jQuery(this).attr("class");
    oldClass = oldClass ? oldClass : '';
    jQuery(this).attr("class", (oldClass+" "+classTitle).trim());
  });
}
jQuery.fn.myRemoveClass = function (classTitle) {
  return this.each(function() {
      var oldClass = jQuery(this).attr("class");
      var startpos = oldClass.indexOf(classTitle);
      var endpos = startpos + classTitle.length;
      var newClass = oldClass.substring(0, startpos).trim() + " " + oldClass.substring(endpos).trim();
      if (!newClass.trim())
        jQuery(this).removeAttr("class");
      else
        jQuery(this).attr("class", newClass.trim());
  });
}

// Начинаем работу когда страница полностью загружена (включая графику)
$(window).load(function () {
  // Получаем доступ к SVG DOM
  var svgobject = document.getElementById('imap'); 
  if ('contentDocument' in svgobject)
    var svgdom = svgobject.contentDocument;

  // Хак для WebKit (чтобы правильно масштабировал нашу карту)
  var viewBox = svgdom.rootElement.getAttribute("viewBox").split(" ");
  var aspectRatio = viewBox[2] / viewBox[3];
  svgobject.height = parseInt(svgobject.offsetWidth / aspectRatio);
});
