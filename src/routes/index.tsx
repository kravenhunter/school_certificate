import { Route, Routes } from "react-router-dom";

import { HomePage, ManagePanel, Page404, QuizPage, ResultPage } from "@pages";

//Routes -строит навигацию  , в компоненте указываем  по какому запросу открывать  нужную страницу

export const RoutesNavigation = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/manage' element={<ManagePanel />} />
      <Route path='/quiz' element={<QuizPage />} />
      <Route path='/result' element={<ResultPage />} />
      <Route path='*' element={<Page404 />} />
      {/* <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/:id" element={<CardById />} />
      <Route path="/order" element={<Order />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/about" element={<About />} />
      <Route path="/exchange" element={<Exchange />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/second" element={<SecondPage />} /> */}
      {/* 
      <Route path="/reactquery" element={<ReactQueryCatalog />} />
      <Route path="/thanks" element={<ThanksFroOrder />} /> */}
    </Routes>
  );
};
