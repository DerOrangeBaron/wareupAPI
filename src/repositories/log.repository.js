const { LogModel } = require("../database");

class LogRepository {
  constructor() {
    this.log = LogModel;
  }

  async create(description, type) {
    try {
        if(process.env.MODE == 'dev'){
          console.log(description);
        }
        return this.log.create({
          description,
          type
        });
    }
    catch (error) {
      console.log(error);
    }
    return null;
  }  
}

module.exports = LogRepository;