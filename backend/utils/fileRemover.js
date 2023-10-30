import fs from "fs";
import path from "path";

export const fileRemover = async (filename) => {
    fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
        if (err && err.code === "ENOENT") {
            //file doesn't exist
            console.log(`File ${filename} doesn't exist, won't remove it`);
        } else if (err) {
            console.log(`Error occured while removing file ${filename}`);
        } else {
            console.log(`Removed ${filename}`);
        }
    });
}

