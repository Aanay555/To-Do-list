#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
async function createTodo() {
    let condition = true;
    while (condition) {
        const choices = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Choose an option:",
                choices: [
                    "Add",
                    "Add More",
                    "Update",
                    "View",
                    "Delete",
                    "Exit",
                ],
            },
        ]);
        switch (choices.choice) {
            case "Add":
                await addTodo();
                break;
            case "Add More":
                await addMoreTodo();
                break;
            case "Update":
                await updateTodo();
                break;
            case "View":
                await viewTodo();
                break;
            case "Delete":
                await deleteTodo();
                break;
            case "Exit":
                condition = false;
                break;
        }
    }
}
async function addTodo() {
    const todo = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "Enter a new TODO item:",
        },
    ]);
    todoList.push(todo.todo);
    console.log((chalk.green.bold `******\nAdded TODO item:\n******${todo.todo}`));
}
async function addMoreTodo() {
    const todo = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "Enter another TODO item:",
        },
    ]);
    todoList.push(todo.todo);
    console.log((chalk.green.bold `******\nAdded TODO item:\n******\t${todo.todo}\t`));
}
async function updateTodo() {
    const todo = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index of the TODO item to update:",
        },
        {
            name: "newTodo",
            type: "input",
            message: "Enter the new TODO item:",
        },
    ]);
    if (todoList[todo.index]) {
        todoList[todo.index] = todo.newTodo;
        console.log((chalk.red.bold `*****Updated TODO item at index ${todo.index}*****`));
    }
    else {
        console.log("Invalid index");
    }
}
async function viewTodo() {
    console.log((chalk.yellow.bold `******Current TODO List :******`));
    console.log(todoList.join("\n"));
}
async function deleteTodo() {
    const index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index of the TODO item to delete:",
        },
    ]);
    if (todoList[index.index]) {
        todoList.splice(index.index, 1);
        console.log((chalk.blueBright.bold `****Deleted TODO item at index ${index.index}****`));
    }
    else {
        console.log("Invalid index");
    }
}
createTodo();
