// classes marked as abstract cant be instantiated themselves. you cant instantiate Department now can be only inherited.
abstract class Department {
  static fiscalYear = 2021;
  // private readonly id: string;
  // private name: string;
  // protected: make property available within class and classes that extends Department
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.name = n;
    // This won't be possible, the method has to be marked as static, constructor can't be marked as static. this referes to the instance created based on the class, the static property is not available on the instance because the whole idea behind static properties and methods is to stay detached from instances so we cant access them from the 'this' keyword.
    // console.log(this.fiscalYear); <- this won't work
    
  }

  static createEmployee(name: string) {
    return {
      name
    }
  }

  // If you dont want to provide the complete implementation you can use an abstract method. The implementation will be done on the inheriting class.
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  
  constructor(id: string, public admins: string[]) {
    // super calls the constructor of the base class
    super(id, 'IT');
    this.admins = admins;
  }

   describe() {
      console.log('IT Department - ID: ' + this.id);   
   }

}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  // private constructor ensures we cant call 'new AccountingDepartment'
  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id);
    
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    
    this.employees.push(name);
  }

   addReport(text: string) {
     this.reports.push(text);
     this.lastReport = text;
  }


  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);


const it = new ITDepartment("d1", ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

it.describe();
it.printEmployeeInformation();

console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting);
console.log(accounting2);


accounting.addEmployee('Max');
accounting.addEmployee('Manu');

accounting.mostRecentReport = "Year End Report";
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);

// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();



// const itCopy = { name: 'DUMMY', describe: it.describe };

// itCopy.describe();


// Singleton pattern: ensuring you will always have one instance of a certain class.