const fs = require('fs');
const path = require('path');

function scanDirectory(dir) {
  let filesList = [];

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      filesList = filesList.concat(scanDirectory(filePath));
    } else if (file.startsWith('api')) {
      filesList.push(filePath);
    }
  });

  return filesList;
}

const apiDirectory = path.join(__dirname, 'apis');
const apiFiles = scanDirectory(apiDirectory);

const transform = (str) =>
  str
    .split('.')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
    .replace(/\./g, '');

const imports = apiFiles
  .map((file) => {
    const importName = path.basename(file, path.extname(file));

    const relativePath = `./${path
      .relative(__dirname, file)
      .replace(/\\/g, '/')}`;

    return `import ${transform(importName)} from '${relativePath}';`;
  })
  .join('\n');

const exportHandlers = `export const handlers = [\n  ${apiFiles
  .map((file) => {
    return transform(path.basename(file, path.extname(file)));
  })
  .join(',\n  ')}\n];`;

const mainFileContent = `${imports}\n\n${exportHandlers}\n`;
console.log('main.ts file content:', mainFileContent);

fs.writeFileSync(path.join(__dirname, 'handlers.ts'), mainFileContent);

console.log('generated successfully.');
