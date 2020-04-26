import constants from './../constants';
let AWS = require('aws-sdk');
// import * as firebase from 'firebase';
const {types, firebaseConfig} = constants;

// firebase.initializeApp(firebaseConfig);

export const testFunction = () => ({
  type: types.TEST_FUNCTION
})

console.log(AWS);

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "us-west-2"
});

let dynamodb = new AWS.DynamoDB();
let docClient = new AWS.DynamoDB.DocumentClient();

console.log(dynamodb)

let params = {
  TableName: "Movies",
  KeySchema: [
    {AttributeName: "year", KeyType: "HASH"},
    {AttributeName: "title", KeyType: "RANGE"}
  ],
  AttributeDefinitions: [
    {AttributeName: "year", AttributeType: "N"},
    {AttributeName: "title", AttributeType: "S"}
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

// dynamodb.createTable(params, function(err, data){
//   if (err){
//     console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//   } else {
//     console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//   }
// })

let putInDB = {
  TableName: "Movies",
  Item: {
    "year": 2015,
    "title": "The Big New Movie",
    "info":{
      "plot": "Nothing happens at all.",
      "rating": 0
    }
  }
}

// docClient.put(putInDB, function(err, data) {
//   if (err) {
//       console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//   } else {
//       console.log("Added item:", JSON.stringify(data, null, 2));
//   }
// });

let getFromDB = {
  TableName: "Movies",
  Key: {
    "year": 2015,
    "title": "The Big New Movie"
  }
}

let info = [];

docClient.get(getFromDB, function(err, data){
  if(err){
    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    info.push(data);
  }
})

console.log(info)