import { readFileSync } from "fs";
import { login, addSaveFile, deleteSaveFile, getSaveFile } from "./lib";

const token = await login("*******", "********");

async function sendFile() {
    if(token === undefined) {
        throw new Error("Token is undefined");
    } else if("title" in token) {
        throw token;
    }
    const blob = new Blob([readFileSync("./main")]);
    console.log(await addSaveFile(token, 0, blob));    
}

async function deleteFile() {
    if(token === undefined) {
        throw new Error("Token is undefined");
    } else if("title" in token) {
        throw token;
    }
    console.log(await deleteSaveFile(token, 0));
}

async function getFile() {
    if(token === undefined) {
        throw new Error("Token is undefined");
    } else if("title" in token) {
        throw token;
    }
    console.log(await getSaveFile(token, 0));
}

//await sendFile();
//await deleteFile();
await getFile();