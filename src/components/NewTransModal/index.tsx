import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { useTransactions } from "../../hooks/useTransactions";

import closeImg from "../../assets/btn_fechar.svg";
import incomeImg from "../../assets/entradas.svg";
import outcomeImg from "../../assets/saidas.svg";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransModal({ isOpen, onRequestClose }: NewTransModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({
      title,
      value,
      category,
      type,
    });

    setTitle("");
    setValue(0);
    setCategory("");
    setType("desposit");
    onRequestClose();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar Modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
          <h2> Cadastrar Transacao</h2>
          <input
            placeholder="Titulo"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
          />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => setType("deposit")}
              isActive={type === "deposit"}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox
              type="button"
              onClick={() => setType("withdraw")}
              isActive={type === "withdraw"}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Saida" />
              <span>Saida</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input
            placeholder="Categoria"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    </>
  );
}
