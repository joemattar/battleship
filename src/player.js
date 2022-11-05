const Player = () => {
  // Type: human / ai
  // Type to be used for ship placement: manual / random
  // Type to be used for shot taking: manual / algorithm
  let type = "human";

  // Name to be used in DOM text
  let name;

  // Player factory method to get the player type
  const getType = () => {
    return type;
  };

  // Player factory method to change the player type between human/ai
  const changeType = () => {
    if (type === "human") {
      type = "ai";
    } else {
      type = "human";
    }
  };

  // Player factory method to get the player name
  const getName = () => {
    return name;
  };

  // Player factory method to change the player name
  const changeName = (newName) => {
    name = newName;
  };

  return {
    getType,
    changeType,
    getName,
    changeName,
  };
};

export { Player };
