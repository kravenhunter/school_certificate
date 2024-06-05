/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import { quizStaticData } from "@/core/index";
import { IQuiz, IQuizStore } from "@/core/types";
import { generateId, shuffleArray, useLocalStorage } from "@/core/utils";

function gePromise<T>(data: T): Promise<T> {
  return new Promise<T>((resolve) => {
    resolve(data);
  });
}
export class ApiServices {
  // ПОлучение всего списка вопросов из статики и  loacl-storage
  static getFullQuizList(): Promise<IQuiz[]> {
    const [readValue, setValue] = useLocalStorage<IQuiz[]>("quiz-storage");
    let getList: IQuiz[] | undefined | null = readValue();

    if (getList) {
      quizStaticData.forEach((data) => {
        getList && (getList = getList.filter((el) => el.id !== data.id));
      });
      getList = [...quizStaticData, ...getList];
    } else {
      setValue(quizStaticData);
      getList = quizStaticData;
    }

    return gePromise(getList);
  }
  // Добавление  Вопросо  loacl-storage
  static async postQuizItem(body: Omit<IQuiz, "id">): Promise<IQuiz> {
    const [readValue, setValue, removeValue] = useLocalStorage<IQuiz[]>("quiz-storage");
    let getList: IQuiz[] | undefined | null = readValue();
    if (getList) {
      const createNewQuizItem = { id: generateId() + getList.length, ...body };
      getList.push(createNewQuizItem);
      removeValue();
      setValue(getList);
      return gePromise(createNewQuizItem);
    }
    getList = await this.getFullQuizList();
    const createNewQuizItem = { id: generateId() + getList.length, ...body };
    getList.push(createNewQuizItem);
    return gePromise(createNewQuizItem);
  }

  // Удаление  вопросо из  loacl-storage
  static async deleteQuizItem(quiz_id: string): Promise<string> {
    const [_, setValue, removeValue] = useLocalStorage<IQuiz[]>("quiz-storage");
    const getList = await this.getFullQuizList();
    getList.filter((el) => el.id !== quiz_id);
    removeValue();
    setValue(getList);

    return gePromise(`Quiz with ID ${quiz_id} is deleted`);
  }
  // Обновление  вопросо  в  loacl-storage
  static async putQuizItem(body: IQuiz): Promise<IQuiz | string> {
    const [_, setValue, removeValue] = useLocalStorage<IQuiz[]>("quiz-storage");

    const getList = await this.getFullQuizList();
    const fetCurrent = getList.find((el) => el.id === body.id);

    fetCurrent &&
      ((fetCurrent.question = body.question),
      (fetCurrent.variants = body.variants),
      (fetCurrent.correct_result = body.correct_result));
    removeValue();
    setValue(getList);

    return gePromise(fetCurrent ?? "Wrong quiz ID");
  }
  // Получение текущего списка тестирования из  loacl-storage
  static getCurrentQuizList(): Promise<IQuiz[] | string> {
    const [readValue] = useLocalStorage<IQuizStore>("current-quiz-storage");
    const getList = readValue();

    if (getList) return gePromise(getList.current__quiz);

    return gePromise("No result data");
  }
  // Получение конкретного вопроса из  loacl-storage
  static getCurrentQuizItem(title: string): Promise<IQuiz | string> {
    const [readValue] = useLocalStorage<IQuiz[]>("quiz-storage");
    const getList = readValue();

    if (getList) {
      const getQuiz = getList.find((el) => el.question === title);
      if (getQuiz) return gePromise(getQuiz);
    }

    return gePromise("No result data");
  }
  // Создает новый список вопросов, предварительно перемешав массив
  // Количество вопросов всегда  16
  static async startNewQuiz(): Promise<IQuiz[]> {
    const [_, setValue] = useLocalStorage<IQuizStore>("current-quiz-storage");

    const getList = await this.getFullQuizList();
    const resultShuffle = shuffleArray(getList).slice(0, 16);
    setValue({ current_index: 0, current__quiz: resultShuffle });
    return gePromise(resultShuffle);
  }
  //Получаем текущий  индекс вопроса  для восстановление из истории
  static async getCurrentQuizIndex(): Promise<{ current_index: number } | string> {
    const [readValue] = useLocalStorage<IQuizStore>("current-quiz-storage");
    const getList = readValue();
    if (getList !== null) {
      console.log(getList);

      //const getCurrentQuizItem = getList.current__quiz.find((el) => el.id === body.id);
      return gePromise({
        current_index: getList.current_index,
      });
    }
    return gePromise("No Data");
  }
  // Записываем ответ на вопрос в хранилище
  static async answerToQuizItem(body: IQuiz): Promise<{ current_index: number; current_quiz: IQuiz } | string> {
    const [readValue, setValue, removeValue] = useLocalStorage<IQuizStore>("current-quiz-storage");
    const getList = readValue();
    if (getList) {
      //const getCurrentQuizItem = getList.current__quiz.find((el) => el.id === body.id);
      const getCurrentQuizItem = getList.current__quiz[getList.current_index];

      if (getCurrentQuizItem) {
        getCurrentQuizItem.answer = body.answer;
        getList.current_index = getList.current_index + 1;
        removeValue();
        setValue(getList);
        return gePromise({
          current_index: getList.current_index,
          current_quiz: getCurrentQuizItem,
        });
      }

      return gePromise("Wring ID");
    }
    return gePromise("No Data");
  }
  // Сохраняем таймер в хранилище
  static async saveQuizTimer(body: string): Promise<string> {
    const [__, setValue] = useLocalStorage<string>("current-quiz-timer");
    setValue(body);
    return gePromise(body);
  }
  //Получаем таймер из хранилища
  static async getQuizTimer(): Promise<string> {
    const [readValue] = useLocalStorage<string>("current-quiz-timer");
    const getTimeQuiz = readValue();
    if (getTimeQuiz) {
      return gePromise(getTimeQuiz);
    }

    return gePromise("No any timer");
  }
  //Получаем флаг , закончен ли  тест
  static async getQuizFlag(): Promise<boolean> {
    const [readValue, setValue] = useLocalStorage<boolean>("current-quiz-flag");
    const result = readValue();
    if (result !== null) return gePromise(result);
    setValue(true);
    return gePromise(true);
  }
  //Обновляем флаг
  static async updateQuizFlag(body: boolean): Promise<boolean> {
    const [__, setValue] = useLocalStorage<boolean>("current-quiz-flag");
    setValue(body);
    return gePromise(body);
  }
}
