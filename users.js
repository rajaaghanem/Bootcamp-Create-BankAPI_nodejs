const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const DEFAULT = 0;

//add a user
function addUser(userCash, userCredit, userPassID) {
  const users = loadUsers();
  const findUser = users.find((user) => {
    return user.passID === userPassID;
  });

  if (findUser) {
    throw Error("User already exist");

  } else {
    const newUser = {
      id: uuidv4(),
      cash: userCash || DEFAULT,
      credit: userCredit || DEFAULT,
      passID: userPassID,
    };

    users.push(newUser);
    saveUser(users);
    return newUser;
  }
}

//Can deposit cash to a user
function updateDeposit(userID, moneyAmount) {
  const users = loadUsers();

  let theUser = findUser(userID);

  if (theUser) {

    theUser = { ...theUser, cash: theUser.cash + moneyAmount };
    const newUsers = users.map((user) => {
      return user.id === userID ? theUser : user;
    });

    saveUser(newUsers);
    return theUser;

  } else {
    throw Error("User doesn't exist");
  }
}

//update a users credit
function updateCredit(userID, moneyAmount) {
  if (moneyAmount < 0) throw Error("Can't update credit with negative number");

  const users = loadUsers();

  let theUser = findUser(userID);

  if (theUser) {
    theUser = { ...theUser, credit: theUser.credit + moneyAmount };
    const newUsers = users.map((user) => {
      return user.id === userID ? theUser : user;
    });
    saveUser(newUsers);
    return theUser;
  } else {
    throw Error("User doesn't exist");
  }
}

//if the use have enough money change the cash and the credit of the user by moneyAmount
function enoughMoney(theUser, moneyAmount) {
  theUser = { ...theUser, cash: theUser.cash - moneyAmount };

  if (theUser.cash < 0)
    theUser = {
      ...theUser,
      credit: theUser.credit + theUser.cash,
      cash: DEFAULT,
    };

  return theUser;
}

//withdraw money from the user
function withdrawMoney(userID, moneyAmount) {
  if (moneyAmount < 0) throw Error("Can't withdraw money with negative number");

  const users = loadUsers();

  let theUser = findUser(userID);

  if (theUser) {

    if (theUser.cash + theUser.credit > moneyAmount) {

      theUser = enoughMoney(theUser, moneyAmount);
      const newUsers = users.map((user) => {

        return user.id === userID ? theUser : user;
      });
      saveUser(newUsers);
      return theUser;

    } else {
      throw Error("Doesn't have enough money");
    }
  } else {
    throw Error("User doesn't exist");
  }
}

// transfer money from one user to another with credit
function transferMoney(transferID, reciverID, moneyAmount) {
  if (moneyAmount < 0) throw Error("Can't transfer money with negative number");

  const users = loadUsers();

  let transferUser = findUser(transferID);
  if (!transferUser) throw Error("Transfer user doesn't exist");

  let reciverUser = findUser(reciverID);
  if (!reciverUser) throw Error("Reciver user doesn't exist");

  if (transferUser.cash + transferUser.credit > moneyAmount) {

    transferUser = enoughMoney(transferUser, moneyAmount);
    reciverUser = { ...reciverUser, credit: reciverUser.credit + moneyAmount };

    const newUsers = users.map((user) => {
      if (user.id === transferID) return transferUser;
      else if (user.id === reciverID) return reciverUser;
      else return user;
    });
    saveUser(newUsers);
    return [transferUser, reciverUser];

  } else {
    throw Error("Doesn't have enough money");
  }
}

//find user by given id
function findUser(userID) {
  const users = loadUsers();

  const user = users.find((user) => {
    return user.id === userID;
  });

  return user;
}

//read a user
function readUser(userID) {
  const users = loadUsers();
  const user = findUser(userID);

  if (user) {
    return user;
  } else {
    throw Error("User not found");
  }
}

function readAllUsers() {
  const users = loadUsers();
  return users;
}

const saveUser = (users) => {
  const dataJson = JSON.stringify(users);
  fs.writeFileSync("users.json", dataJson);
};

const loadUsers = () => {
  try {
    const dataBuffer = fs.readFileSync("users.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
    
  } catch (e) {
    return [];
  }
};

module.exports = {
  readUser,
  addUser,
  updateDeposit,
  updateCredit,
  withdrawMoney,
  transferMoney,
  readAllUsers,
};
