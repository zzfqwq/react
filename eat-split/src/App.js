import { Children, useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriend] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showSplitBill, setShowSplitBill] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [image, setImage] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddNewFriend(e) {
    e.preventDefault();
    const newFriend = {
      id: Date.now(),
      name: friendName,
      image: image,
      balance: 0,
    };
    setFriend((friends) => [...friends, newFriend]);
    setFriendName("");
    setImage("");
  }

  function handleShowSplitBill(friend) {
    if (selectedFriend && selectedFriend.id === friend.id) {
      setShowSplitBill((showSplitBill) => !showSplitBill);
    }

    setSelectedFriend(friend);
  }

  function handleCountBalance(e) {
    e.preventDefault();

    const userPaid = Number(paidByUser);
    const total = Number(bill);
    const friendPaid = total - userPaid;

    let newBalance;

    if (whoIsPaying === "user") {
      newBalance = friendPaid;
    } else {
      newBalance = -userPaid;
    }

    setFriend(
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: newBalance }
          : friend
      )
    );

    setBill("");
    setPaidByUser("");
    setWhoIsPaying("user");
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          handleShowSplitBill={handleShowSplitBill}
          showSplitBill={showSplitBill}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && (
          <FormAddFriend
            handleAddNewFriend={handleAddNewFriend}
            friendName={friendName}
            image={image}
            setFriendName={setFriendName}
            setImage={setImage}
          />
        )}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {showSplitBill && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          bill={bill}
          setBill={setBill}
          paidByUser={paidByUser}
          setPaidByUser={setPaidByUser}
          whoIsPaying={whoIsPaying}
          setWhoIsPaying={setWhoIsPaying}
          handleCountBalance={handleCountBalance}
        />
      )}
    </div>
  );
}

function FriendsList({
  friends,
  handleShowSplitBill,
  showSplitBill,
  selectedFriend,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          handleShowSplitBill={handleShowSplitBill}
          showSplitBill={showSplitBill}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({
  friend,
  handleShowSplitBill,
  showSplitBill,
  selectedFriend,
}) {
  return (
    <li>
      <img src={friend.image} alt={friend.id} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${-friend.balance}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => handleShowSplitBill(friend)}>
        {showSplitBill && selectedFriend.id === friend.id ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({
  handleAddNewFriend,
  friendName,
  setFriendName,
  image,
  setImage,
}) {
  return (
    <div>
      <form className="form-add-friend" onSubmit={handleAddNewFriend}>
        <label>👭 Friend Name</label>
        <input
          type="text"
          value={friendName}
          required
          onChange={(e) => setFriendName(e.target.value)}
        />
        <label>🖼️ Img URL</label>
        <input
          type="text"
          value={image}
          required
          onChange={(e) => setImage(e.target.value)}
        />
        <button className="button">Add</button>
      </form>
    </div>
  );
}

function FormSplitBill({
  selectedFriend,
  bill,
  setBill,
  paidByUser,
  setPaidByUser,
  whoIsPaying,
  setWhoIsPaying,
  handleCountBalance,
}) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => setPaidByUser(Number(e.target.value))}
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
      <input type="text" disabled />

      <label>🤔 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button onClick={handleCountBalance}>Split bill</Button>
    </form>
  );
}
