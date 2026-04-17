import {promise as fs} from 'fs';
import {test} from '@playwright/test';


test('Reading json file ',() =>{
    const filepath = './data/data.json';
    async function getJsonData(filepath:string){
        try{
            const rawdata = await fs.readFile(filepath);
            const jsonData = JSON.parse(rawdata);
            console.log(jsonData);
        }
        catch (error){
            console.error("Error reading JSON file", error)
        }
    }
    getJsonData(filepath);
})
