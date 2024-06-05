import { HomePage, ManagePanel, Page404, QuizPage, ResultPage } from "@pages";
import { Route, Routes } from "react-router-dom";

export const RoutesNavigation = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/manage' element={<ManagePanel />} />
      <Route path='/quiz' element={<QuizPage />} />
      <Route path='/result' element={<ResultPage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
};
