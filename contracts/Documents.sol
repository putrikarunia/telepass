pragma solidity ^0.4.4;

contract Documents {
  mapping (address => Folder) userData;
  mapping (address => Institution) institutions;
  mapping (uint => address) requestOwner;

  uint requestCount;
  uint institutionCount;

  struct Folder {
    File[] files;
    address owner;
  }

  struct Institution {
    uint ID;
    bytes32 name;
  }

  struct File {
    bytes32 data;
    address owner;
  }

  Folder newFolder;

  event generateCode(uint code);

  function Documents() {
    requestCount = 1;
    institutionCount = 1;
  }

  function registerUser(address user) {
    userData[user] = newFolder;
    userData[user].owner = user;
  }

  function registerInstitution(address inst, bytes32 name) {
    Institution memory newInstitution;
    newInstitution.ID = institutionCount;
    newInstitution.name = name;
    institutionCount++;

    institutions[inst] = newInstitution;
  }

  function getUserData(address owner) constant returns(bytes32 data) {
    Folder memory myFolder = userData[owner];
    if(myFolder.files.length <= 0) return "no files";
    File memory myFile = myFolder.files[0];
    bytes32 myData = myFile.data;
    return myData;
  }

  function issueData(address owner, bytes32 data) returns (bool success) {
    Folder memory myFolder = userData[owner];
    if(myFolder.files.length <= 0) registerUser(owner);

    File memory newData;
    newData.data = data;
    newData.owner = owner;

    userData[owner].files.push(newData);
    return true;
  }

  function requestCode(address requester) returns (bool success) {
    if(institutions[requester].name == "") return false; //institution not registered
    requestCount++;
    return true;
  }

  function getCode(address requester) constant returns (uint uniqueCode) {
    if(institutions[requester].name == "") return 0; //institution not registered
    Institution memory theInstitution = institutions[requester];
    uint ID = theInstitution.ID;
    uint code = ID * (requestCount - 1);
    return code;
  }

  function grantAccess(address granter, uint ID) returns (bool success) {
    address owner = granter;
    requestOwner[ID] = owner;
    return true;
  }

  function requestData(uint ID) constant returns (bytes32 data) {
    address owner = requestOwner[ID];
    Folder memory userFolder = userData[owner];
    if(userFolder.files.length <= 0) return "no files";
    var index = userFolder.files.length - 1;
    File memory myFile = userFolder.files[index];
    bytes32 myData = myFile.data;
    return myData;
  }
}


/*
var doc = Documents.deployed().then(function(instance){doc=instance})
*/
  /*File memory newData;
  newData.data = "abcde";

  newFolder.files.push(newData);*/
