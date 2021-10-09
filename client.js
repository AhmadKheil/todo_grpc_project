const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];

const client = new todoPackage.Todo(
  "0.0.0.0:40000",
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: text,
  },
  (err, response) => {
    console.log(
      "Response recieved from the server : " + JSON.stringify(response)
    );
  }
);

client.readTodos({}, (err, response) => {
  console.log("Read all todos from the server : " + JSON.stringify(response));
});
