import { useState } from "react";

export default function App() {
  const [bills, setBills] = useState("");
  const [yourTip, setYourTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);
  const [yourRate, setYourRate] = useState("0");
  const [friendRate, setFriendRate] = useState("0");

  function handleYourTip(rate) {
    setYourRate(rate);
    setYourTip(rate * Number(bills));
  }

  function handleFriendTip(rate) {
    setFriendRate(rate);
    setFriendTip(rate * Number(bills));
  }

  function handleReset() {
    setBills("");
    setFriendRate("");
    setYourRate("");
    setYourTip("");
    setFriendTip("");
  }

  return (
    <div>
      <Bill bills={bills} onSetBills={setBills} />
      <LikeService onSetRate={handleYourTip} rate={yourRate}>
        How did you like the service?
      </LikeService>
      <LikeService onSetRate={handleFriendTip} rate={friendRate}>
        How did your friend like the service?
      </LikeService>
      <TotalPay bills={bills} yourTip={yourTip} friendTip={friendTip} />
      <Reset handleReset={handleReset} />
    </div>
  );
}

function Bill({ bills, onSetBills }) {
  return (
    <div>
      <h3>How much was the bills?</h3>
      <input
        type="text"
        value={bills}
        placeholder="bills"
        onChange={(e) => onSetBills(e.target.value)}
      />
    </div>
  );
}

function LikeService({ children, rate, onSetRate }) {
  return (
    <div>
      <h3>{children}</h3>
      <select value={rate} onChange={(e) => onSetRate(Number(e.target.value))}>
        <option value="0">Dissatisfied(0%)</option>
        <option value="0.05">It was Okay(5%)</option>
        <option value="0.1">It was Good(10%)</option>
        <option value="0.2">Absolutely Amazing!(20%)</option>
      </select>
    </div>
  );
}

function TotalPay({ bills, yourTip, friendTip }) {
  return (
    <div>
      <h1>
        {`You pay $${
          Number(bills) + Number(yourTip) + Number(friendTip)
        } ($${bills} + $${Number(yourTip) + Number(friendTip)} tip)`}
      </h1>
    </div>
  );
}

function Reset({ handleReset }) {
  return (
    <div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
