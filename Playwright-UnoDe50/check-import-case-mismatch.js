const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, fileList);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function extractImports(fileContent) {
  const requireRegex = /require\(['"](.+?)['"]\)/g;
  const importRegex = /import(?:["'\s]*[\w*{}\n, ]+from\s*)?["'](.+?)["']/g;
  const imports = [];

  let match;
  while ((match = requireRegex.exec(fileContent)) !== null) {
    imports.push(match[1]);
  }
  while ((match = importRegex.exec(fileContent)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

function tryAddJsExtension(p) {
  if (fs.existsSync(p)) return p;
  if (fs.existsSync(p + '.js')) return p + '.js';
  if (fs.existsSync(p + '.ts')) return p + '.ts';
  if (fs.existsSync(p + '/index.js')) return p + '/index.js';
  if (fs.existsSync(p + '/index.ts')) return p + '/index.ts';
  return null;
}

function checkCaseMismatch() {
  const files = walkDir(projectRoot);
  const errors = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    const imports = extractImports(content);

    for (const importPath of imports) {
      if (!importPath.startsWith('.') && !importPath.startsWith('/')) continue;

      const resolvedPath = path.resolve(path.dirname(filePath), importPath);
      const realPath = tryAddJsExtension(resolvedPath);
      if (!realPath || !fs.existsSync(realPath)) continue;

      const expected = path.basename(realPath);
      const used = path.basename(importPath + (path.extname(realPath) ? '' : path.extname(realPath)));

      if (expected !== used) {
        errors.push({
          file: filePath,
          importUsed: importPath,
          actualFile: expected,
        });
      }
    }
  }

  if (errors.length === 0) {
    console.log('✅ No case mismatches found.');
  } else {
    console.log('⚠️ Case mismatches found:\n');
    for (const err of errors) {
      console.log(`File: ${err.file}`);
      console.log(`  Import used: ${err.importUsed}`);
      console.log(`  Actual file: ${err.actualFile}\n`);
    }
    process.exit(1); // utile per CI
  }
}

checkCaseMismatch();
