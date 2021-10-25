import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import Modal from "react-modal";

import { NewTransModal } from "./components/NewTransModal";

import { useState } from "react";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransModalOpen, setIsNewTransModalOpen] = useState(false);

  function handleOpenNewTransModal() {
    setIsNewTransModalOpen(true);
  }

  function handleCloseNewTransModal() {
    setIsNewTransModalOpen(false);
  }
  return (
    <>
      <Header onOpenNewTransModal={handleOpenNewTransModal} />
      <Dashboard />
      <NewTransModal
        isOpen={isNewTransModalOpen}
        onRequestClose={handleCloseNewTransModal}
      />
      <GlobalStyle />
    </>
  );
}
