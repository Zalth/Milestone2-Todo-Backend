import {ObjectId} from 'mongodb';

let todos: { 
    insertOne: (arg0: { name: any; priority: any; dueDate: any; description: any; dateCreated: Date; }) => any; 
    updateOne: (arg0: { _id: any; }, arg1: { $set: { name: any; priority: any; description: any; dueDate: any; }; }) => any; 
    deleteOne: (arg0: { _id: any; }) => any; 
    find: (arg0: { _id: any; } | undefined) => any; } | { 
        insertOne: (arg0: { name: any; priority: any; dueDate: any; description: any; dateCreated: Date; }) => any; 
        updateOne: (arg0: { _id: any; }, arg1: { $set: { name: any; priority: any; description: any; dueDate: any; }; }) => any; 
        deleteOne: (arg0: { _id: any; }) => any; 
        find: (arg0: { _id: any; name: any; priority: any; dueDate: any; description: any; dateCreated: Date; } | undefined) => any; };

export default class TodosDAO {
    // Method to connect to a specific database and collection using .env identifiers
    static async injectDB(connect: { db: (arg0: string | undefined) => { (): any; new(): any; collection: { (arg0: string | undefined): { 
        insertOne: (arg0: { name: any; priority: any; dueDate: any; description: any; dateCreated: Date; }) => any; 
        updateOne: (arg0: { _id: any; }, arg1: { $set: { name: any; priority: any; description: any; dueDate: any; }; }) => any; 
        deleteOne: (arg0: { _id: any; }) => any; 
        find: (arg0: { _id: any; } | undefined) => any; } | PromiseLike<{ 
            insertOne: (arg0: { name: any; priority: any; dueDate: any; description: any; dateCreated: Date; }) => any; 
            updateOne: (arg0: { _id: any; }, arg1: { $set: { name: any; priority: any; description: any; dueDate: any; }; }) => any; 
            deleteOne: (arg0: { _id: any; }) => any; 
            find: (arg0: {_id: any; name: any; priority: any; dueDate: any; description: any; dateCreated: Date; } | undefined) => any; }>; new(): any; }; }; }) {
        if (todos) {
            return
        }
        try {
            todos = await connect.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION)
            console.log("its connected")
        }
        catch(error) {
            console.error(`Unable to establish connection handle in todosDAO: ${error}`);
        }
    }

    // Create a todo Document in Mongo by passing in todo object
    static async addTodo(name: any, priority: any, dueDate: any, description: any) {
        try {
            
            const todoDoc = {
                name: name, 
                priority: priority, 
                dueDate: dueDate, 
                description: description,
                dateCreated: new Date()
            }
            
            return await todos.insertOne(todoDoc)
        } 
        catch (error) {
            console.error(`Unable to post todo: ${error}`);
            return {error: error}
        }
    }

    // Update todo Document based on Mongo ObjectId. Todo is an object of new info
    static async updateTodo(todoId: any, name: any, priority: any, dueDate: any, description: any) {
        try {
            const updateResponse = await todos.updateOne(
                {"_id": new ObjectId(todoId)}, 
                {$set: {
                    name: name, 
                    priority: priority, 
                    description: description, 
                    dueDate: dueDate}}
            )   
            return updateResponse
        } 
        catch (error) {
            console.error(`Unable to update todo: ${error}`);
            return {error: error}
        }
    }

    // Delete todo Document based on Mongo ObjectId
    static async deleteTodo(todoId: any) {
        try {
            const deleteResponse = await todos.deleteOne({"_id": new ObjectId(todoId)});
            return deleteResponse
        } 
        catch (error) {
            console.error(`Unable to delete todo: ${error}`);
            return {error: error}
        }
    }

    static async getTodosId(todoId: any) {
        let cursor;
        try {
           cursor = await todos.find(todoId);
           const todo = await cursor.toArray();
           
           
           return todo
           
            
            
        } catch (error) {
            console.error(`Unable to issue find command, ${error}`);
            let todoList = {};
            return todoList
        }
    }

    static async getTodos(_id: any) {
        console.log("getting")
        let cursor: any;
        try{
            cursor = await todos.find(_id);
            
            const todosList = await cursor.toArray();
            
            return todosList
        }
        catch(error) {
            console.error(`Unable to issue find command, ${error}`);
            let todosList: string[] = [];
            return todosList
        }
    }
}