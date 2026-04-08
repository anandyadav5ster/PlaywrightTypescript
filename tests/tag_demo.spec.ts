import { test } from '@playwright/test';

test('Demo for tag',{tag:'@demotag'}, async({page}) =>{
    console.log('Tagging test cases')
})