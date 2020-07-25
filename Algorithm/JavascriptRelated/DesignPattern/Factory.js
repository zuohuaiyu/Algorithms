
// =================== 简单工厂 =============================== //
function User(age, name, career, work) {
    this.age = age;
    this.name = name;
    this.career = career;
    this.work = work;
}

function Factory(name, age, career) {
    let work;
    switch(career) {
        case 'coder':
            work = ['code', 'fix bug'];
            break;
        case 'pm' :
            work = ['prd', 'order room'];
            break;
        case ' *** ':
            // ... ... 
    }
    return new User(age, name, career, work)
}

// 抽象工厂

/* 
    抽象工作不干活，具体工厂（concrete factory）才干活
*/
