import { generateId } from "@/core/utils";

export const quizStaticData = [
  {
    id: generateId(),
    question: "Что должен знать фронтенд-разработчик? Назовите три ключевых технологии",
    variants: ["HTML, CSS и Javascript", "Kotlin, PHP и Javascript", "PHP, HTML и CSS"],
    correct_result: "HTML, CSS и Javascript",
    single_choose: false,
    multiple_choose: true,
    short_anwer: false,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "Какой фреймворк использует Virtual DOM?",
    variants: ["dotNet ramework", "Dgango", "React"],
    correct_result: "React",
    single_choose: false,
    multiple_choose: false,
    short_anwer: true,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "Что такое синтетические события в React?",
    variants: ["Реакт обёртка  для нативных событий", "Силиконовые события", "Обычные события"],
    correct_result: "Реакт обёртка  для нативных событий",
    single_choose: false,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: true,
  },
  {
    id: generateId(),
    question: "Что такое lazy-loading? ",
    variants: ["Трудный на подбём", "Ленивая загрузка", "Обычная загрузка компонента"],
    correct_result: "Ленивая загрузка",
    single_choose: true,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "Что такое сhildren?",
    variants: ["Пропс", "Ребёнок", "Какое-то непонятное слово"],
    correct_result: "Пропс",
    single_choose: true,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "Что такое JSX",
    variants: ["Javascript xml", "Реакт компонент", "Jiga-jiga"],
    correct_result: "Пропс",
    single_choose: false,
    multiple_choose: true,
    short_anwer: false,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "Что такое JSX-фрагмент?",
    variants: ["Специальный тег JSX", "Специальный тег Реакт", "HTML-тег"],
    correct_result: "Специальный тег JSX",
    single_choose: false,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: true,
  },
  {
    id: generateId(),
    question: "Для чего служит хук useState в Реакт?",
    variants: ["Для хранения состояний", "Не знаю", "В реакте нет такого"],
    correct_result: "Для хранения состояний",
    single_choose: true,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "Для чего служит useCallback?",
    variants: ["Для хеширования объектов", "Не знаю", "Для хеширования функций"],
    correct_result: "Для хеширования функций",
    single_choose: true,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "Для чего служит useMemo?",
    variants: ["Для хеширования объектов", "Не знаю", "Для хеширования тяжёловесной  логики"],
    correct_result: "Для хеширования тяжёловесной  логики",
    single_choose: true,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: false,
  },

  {
    id: generateId(),
    question: "Для чего служит React.memo?",
    variants: ["Для хеширования объектов", "Не знаю", "Для хеширования компонентов"],
    correct_result: "Для хеширования тяжёловесной  логики",
    single_choose: true,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "Для чего служит shouldComponentUpdate?",
    variants: ["Для хеширования объектов", "Проверяет изменились ли пропсы компонента", "Для хеширования компонентов"],
    correct_result: "Проверяет изменились ли пропсы компонента",
    single_choose: true,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "Для чего служит хук useParams?",
    variants: ["Для хеширования", "Дает доступ к параметам поисковой строки", "Для получения параметров  компонентов"],
    correct_result: "Проверяет изменились ли пропсы компонента",
    single_choose: true,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "Что такое Object, Array, Functio, Boolean?",
    variants: ["Объекты", "Примитивы", "Это структуры данных в Javascript"],
    correct_result: "Это структуры данных в Javascript",
    single_choose: true,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "Разница между null и undefined?",
    variants: [
      "Нет разницы",
      "Отсутсвите данных",
      "undefined - дефолтное отсутствие данных, а null - задается разработчиком",
    ],
    correct_result: "undefined - дефолтное отсутствие данных, а null - задается разработчиком",
    single_choose: true,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: false,
  },
  {
    id: generateId(),
    question: "В чем особенность var по отношению к  let и const?  ",
    variants: ["Нет особенностей", "Var - подвержена такому состояние как hosting", "Затрудняюсь ответить"],
    correct_result: "Var - подвержена такому состояние как hosting",
    single_choose: true,
    multiple_choose: false,
    short_anwer: false,
    long_anwer: false,
  },
];
