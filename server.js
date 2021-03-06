const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
});

server.start();

const Todos = [];

function createTodo(call, callback) {
  const todoItem = {
    id: Todos.length + 1,
    text: call.request.text,
  };
  Todos.push(todoItem);
  console.log(todoItem);
  callback(null, { todoItem: todoItem });
}

function readTodos(call, callback) {
  callback(null, { todoItems: Todos });
}
