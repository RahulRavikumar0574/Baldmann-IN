// Simple Node.js/Express API for searching all project files for a word/phrase
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../../..'); // Adjust as needed
const EXTS = ['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.css', '.html'];

function walk(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      if (!['node_modules', '.git', 'build', 'dist', '.next', '.vercel', '.vscode'].includes(file)) {
        walk(filepath, filelist);
      }
    } else if (EXTS.includes(path.extname(file))) {
      filelist.push(filepath);
    }
  });
  return filelist;
}

function searchFiles(query) {
  const files = walk(PROJECT_ROOT);
  const results = [];
  const regex = new RegExp(query, 'i');
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (regex.test(content)) {
      // Return file and a snippet
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (regex.test(line)) {
          results.push({
            file: path.relative(PROJECT_ROOT, file),
            line: idx + 1,
            snippet: line.trim()
          });
        }
      });
    }
  }
  return results;
}

module.exports = (req, res) => {
  const q = req.query.q || '';
  if (!q.trim()) return res.json({ results: [] });
  try {
    const results = searchFiles(q.trim());
    res.json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
