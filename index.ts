import { readFileSync } from "fs";
import { login, addSaveFile, deleteSaveFile, getSaveFile } from "./lib";

const dotEnv = await Bun.file(Bun.main.split("/").slice(0, -1).join("/") + "/.env").text().then(str => str.split("\n") as [string, string]).then(content => {
    return {username: content[0], password: content[1]}
});

const token = await login(dotEnv.username, dotEnv.password);

async function sendFile() {
    if(token === undefined) {
        throw new Error("Token is undefined");
    } else if("title" in token) {
        throw token;
    }
    const blob = new Blob([readFileSync("./main")]);
    console.log(await addSaveFile(token, "0004000000055D00", blob));    
}

async function deleteFile() {
    if(token === undefined) {
        throw new Error("Token is undefined");
    } else if("title" in token) {
        throw token;
    }
    console.log(await deleteSaveFile(token, "0004000000055D00"));
}

async function getFile() {
    if(token === undefined) {
        throw new Error("Token is undefined");
    } else if("title" in token) {
        throw token;
    }
    console.log(await getSaveFile(token, "0004000000055D00"));
}

await sendFile();
//await deleteFile();
//await getFile();