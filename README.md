1. grep command to run the test with the tag
ex : npx playwright test --grep @locator

2. Workers is used to run the parallel or serial
ex : npx playwright test --grep @locator --workers=1

powershell command 
$env:ENV="staging"; npx playwright test


ENV=staging npx playwright test handle_mul_env.ts

https://medium.com/@irfan17sat/configuring-multiple-environments-in-playwright-67e402c1c627
