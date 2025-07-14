import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  function handlePrevious() {
    if (step > 1) {
      setStep((step) => step - 1);
    }
  }

  function handleNext() {
    if (step < messages.length) {
      setStep((step) => step + 1);
    }
  }

  return (
    <>
      <button className="close" onClick={handleOpen}>
        &times;
      </button>
      {isOpen ? (
        <div className="steps">
          <Steps step={step} />
          <Message step={step} messages={messages} />
          <Button handlePrevious={handlePrevious} handleNext={handleNext} />
        </div>
      ) : null}
    </>
  );
}

function Steps({ step }) {
  return (
    <div className="numbers">
      <div className={step >= 1 ? "active" : ""}>1</div>
      <div className={step >= 2 ? "active" : ""}>2</div>
      <div className={step >= 3 ? "active" : ""}>3</div>
    </div>
  );
}

function Message({ messages, step }) {
  return (
    <p className="message">
      Step {step}: {messages[step - 1]}
    </p>
  );
}

function Button({ handlePrevious, handleNext }) {
  return (
    <div className="buttons">
      <button
        style={{ backgroundColor: "#7950f2", color: "#fff" }}
        onClick={handlePrevious}
      >
        Previous
      </button>
      <button
        style={{ backgroundColor: "#7950f2", color: "#fff" }}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}
