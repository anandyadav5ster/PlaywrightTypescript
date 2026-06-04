import {test} from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('upload multiple files with dynamic name and size', async({page}) =>{

    //  const dirPath = path.resolve(__dirname, '../data');
    // const files = fs.readdirSync(dirPath)
    // .map((filename:string) => path.join(dirPath,filename));

    // console.log(files);
    getFilePath();

})

async function getFilePath(){
     const dirPath = path.resolve(__dirname , '../data');
     const files =  fs.readdirSync(dirPath)
      .map((filename: string) => path.join(dirPath, filename));
      console.log(files);
}