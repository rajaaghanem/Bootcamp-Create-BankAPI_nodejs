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
    return "User already exist";
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

//delete a user
function removeUser(userID) {
  const users = loadUsers();

  const newUsers = users.filter((user) => {
    return user.id !== userID;
  });

  saveUser(newUsers);
}

//Can deposit cash to a user
function updateDeposit(userID, moneyAmount) {
  const users = loadUsers();

  let theUser = users.find((user) => {
    return user.id === userID;
  });

  if (theUser) {
    theUser = { ...theUser, cash: theUser.cash + moneyAmount };
    const newUsers = users.map((user) => {
      return user.id === userID ? theUser : user;
    });
    saveUser(newUsers);
    return theUser;
  } else {
    return "User doesn't exist";
  }
}

//update a users credit
function updateCredit(userID, moneyAmount) {
  if (moneyAmount < 0) return "Can't update credit with negative number";

  const users = loadUsers();

  let theUser = users.find((user) => {
    return user.id === userID;
  });

  if (theUser) {
    theUser = { ...theUser, credit: theUser.credit + moneyAmount };
    const newUsers = users.map((user) => {
      return user.id === userID ? theUser : user;
    });
    saveUser(newUsers);
    return theUser;
  } else {
    return "User doesn't exist";
  }
}

//withdraw money from the user 
function withdrawMoney(userID, moneyAmount){
  if (moneyAmount < 0) return "Can't withdraw money with negative number";

  const users = loadUsers();

  let theUser = users.find((user) => {
    return user.id === userID;
  });

  if (theUser){
    if(theUser.cash + theUser.credit > moneyAmount){
      theUser = { ...theUser, cash: theUser.cash - moneyAmount };
      if (theUser.cash < 0) theUser = { ...theUser, credit: theUser.credit + theUser.cash, cash:DEFAULT };
      const newUsers = users.map((user) => {
        return user.id === userID ? theUser : user;
      });
      saveUser(newUsers);
      return theUser;
    }else {
      return ("Doesn't have enough money")
    }
  } else {
    return ("User doesn't exist");
  }
}

// transfer money from one user to another with credit
function transferMoney(transferID, reciverID, moneyAmount){
  if (moneyAmount < 0) return "Can't transfer money with negative number";

  const users = loadUsers();

  let transferUser = users.find((user) => {
    return user.id === transferID;
  });

  if(!transferUser) return ("Transfer user doesn't exist");

  let  reciverUser = users.find((user) => {
    return user.id === reciverID;
  });

  if(!reciverUser) return ("Reciver user doesn't exist");
 
  if(transferUser.cash + transferUser.credit > moneyAmount){
    transferUser = { ...transferUser, cash: transferUser.cash - moneyAmount };
    if (transferUser.cash < 0) transferUser = { ...transferUser, credit: transferUser.credit + transferUser.cash, cash:DEFAULT };
    reciverUser= {... reciverUser, credit: reciverUser.credit+ moneyAmount}
    const newUsers = users.map((user) => {
      if (user.id === transferID) return transferUser;
      else if (user.id === reciverID) return reciverUser;
      else return user;
    });
    saveUser(newUsers);
    return ([transferUser, reciverUser]);
  }else {
    return ("Doesn't have enough money");
  }

}

//update a user
function updateUser(userID, userName, userEmail) {
  const users = loadUsers();

  const theUser = users.find((user) => {
    return user.id === userID;
  });

  if (theUser) {
    const editedUser = {
      id: userID,
      name: userName || theUser.name,
      email: userEmail || theUser.email,
    };
    const newUsers = users.map((user) => {
      return user.id === userID ? editedUser : user;
    });
    saveUser(newUsers);
  }
}

//read a user

function readUser(userID) {
  const users = loadUsers();
  const user = users.find((user) => {
    return user.id === userID;
  });

  if (user) {
    return { name: user.name, email: user.email };
  } else {
    console.log("User not found");
  }
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
  updateUser,
  removeUser,
  addUser,
  updateDeposit,
  updateCredit,
  withdrawMoney,
  transferMoney,
};
