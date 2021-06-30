import React from "react";
import List from "./List";
import Header from "./Header";

import { useRandomTextMachine } from "../machines/randomTextMachine";

const HomePage = () => {
  const [state, dispatch] = useRandomTextMachine();

  const isLoadingTexts = state.matches("loadingTexts.loading");
  const texts = state.context.texts;

  const onFetchTexts = React.useCallback(() => {
    dispatch("FETCH_TEXTS");
  }, [dispatch]);

  return (
    <>
      <Header showLoading={isLoadingTexts} onFetchTexts={onFetchTexts} />
      <List texts={texts} showLoading={isLoadingTexts} />
    </>
  );
};
export default HomePage;
