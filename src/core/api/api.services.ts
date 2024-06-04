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
  //Returns  full quiz list  in the store includs the new ones
  static getFullQuizList(): Promise<IQuiz[]> {
    const [readValue, setValue] = useLocalStorage<IQuiz[]>("quiz-storage");
    let getList: IQuiz[] | undefined | null = readValue();

    if (getList) {
      quizStaticData.forEach((el) => {
        getList && (getList = getList.filter((el) => el.id !== el.id));
      });
      getList = [...quizStaticData, ...getList];
    } else {
      setValue(quizStaticData);
      getList = quizStaticData;
    }

    return gePromise(getList);
  }
  // Adds a new quiz record to the list-store
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

  // Delete  a record in  the list-store
  static async deleteQuizItem(quiz_id: string): Promise<string> {
    const [_, setValue, removeValue] = useLocalStorage<IQuiz[]>("quiz-storage");
    const getList = await this.getFullQuizList();
    getList.filter((el) => el.id !== quiz_id);
    removeValue();
    setValue(getList);

    return gePromise(`Quiz with ID ${quiz_id} is deleted`);
  }
  // Update  a record in  the list-store
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
  //Returns  full quiz list  in the store includs the new ones
  static getCurrentQuizList(): Promise<IQuiz[] | string> {
    const [readValue] = useLocalStorage<IQuizStore>("current-quiz-storage");
    const getList = readValue();

    if (getList) return gePromise(getList.current__quiz);

    return gePromise("No result data");
  }
  static getCurrentQuizItem(title: string): Promise<IQuiz | string> {
    const [readValue] = useLocalStorage<IQuiz[]>("quiz-storage");
    const getList = readValue();

    if (getList) {
      const getQuiz = getList.find((el) => el.question === title);
      if (getQuiz) return gePromise(getQuiz);
    }

    return gePromise("No result data");
  }
  // Returns  a new  quiz-list
  static async startNewQuiz(): Promise<IQuiz[]> {
    const [_, setValue] = useLocalStorage<IQuizStore>("current-quiz-storage");

    const getList = await this.getFullQuizList();
    const resultShuffle = shuffleArray(getList).slice(0, 16);
    setValue({ current_index: 0, current__quiz: resultShuffle });
    return gePromise(resultShuffle);
  }
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
  static async saveQuizTimer(body: string): Promise<string> {
    const [__, setValue] = useLocalStorage<string>("current-quiz-timer");
    setValue(body);
    return gePromise(body);
  }
  static async getQuizTimer(): Promise<string> {
    const [readValue] = useLocalStorage<string>("current-quiz-timer");
    const getTimeQuiz = readValue();
    if (getTimeQuiz) {
      return gePromise(getTimeQuiz);
    }

    return gePromise("No any timer");
  }
  static async getQuizFlag(): Promise<boolean> {
    const [readValue, setValue] = useLocalStorage<boolean>("current-quiz-flag");
    const result = readValue();
    if (result !== null) return gePromise(result);
    setValue(true);
    return gePromise(true);
  }
  static async updateQuizFlag(body: boolean): Promise<boolean> {
    const [__, setValue] = useLocalStorage<boolean>("current-quiz-flag");
    setValue(body);
    return gePromise(body);
  }

  // Returns  a current started  quiz-list
  static async getCurrentQuiz(): Promise<IQuiz[] | string> {
    const [readValue] = useLocalStorage<IQuizStore>("current-quiz-storage");
    const getList = readValue();

    if (getList) return gePromise(getList.current__quiz);

    return gePromise("There is no any started quizes in the store");
  }

  static async testGetAction(): Promise<{ index: number } | string> {
    const [readValue] = useLocalStorage<{ index: number }>("current-test-index");
    const getIndex = readValue();
    if (getIndex !== null) {
      //const getCurrentQuizItem = getList.current__quiz.find((el) => el.id === body.id);
      return gePromise({
        index: getIndex.index,
      });
    }
    return gePromise("No Data");
  }
}
