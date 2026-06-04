function Log(customName: string) {
    // The second argument is now a 'context' object, and there is no 3rd argument
    return function (originalMethod: any, context: ClassMethodDecoratorContext) {
        
        function replacementMethod(this: any, ...args: any[]) {
            console.log(`Starting: ${customName}`);
            return originalMethod.apply(this, args);
        }

        return replacementMethod;
    };
}

class MyClass {
    @Log("User Authentication")
    login(msg:string) {
       console.log(`Logged in with: ${msg}`);
    }
}
const sessionA = new MyClass();
const sessionB = new MyClass();

sessionA.login("Admin"); // Logs: Starting User Authentication...
sessionB.login("Guest"); // Logs: Starting User Authentication...