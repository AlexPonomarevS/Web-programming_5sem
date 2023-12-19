document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("introButton").addEventListener("click", function () {
    var intro = introJs();
    intro.setOptions({
      steps: [
        {
          element: "#Главная",
          intro: "Пример шага 1",
        },
        {
          element: "#Каталог",
          intro: "Пример шага 2",
        },
        {
          element: "#Корзина",
          intro: "Пример шага 3",
        },
        {
          element: "#Сотрудничество",
          intro: "Пример шага 4",
        },
        {
          element: "#Желания",
          intro: "Пример шага 5",
        },
      ],
    });
    intro.start();
  });
});
