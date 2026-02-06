const fs = require('fs');
const path = require('path');

class LocalStorage {
  constructor(basePath) {
    this.basePath = basePath;
  }

  async save(relativePath, buffer) {
    const fullPath = path.join(this.basePath, relativePath);
    await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.promises.writeFile(fullPath, buffer);
    return relativePath;
  }
}

module.exports = LocalStorage;
