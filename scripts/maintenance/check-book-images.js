const pool = require('../../db');

async function checkBookImages() {
  try {
    const [books] = await pool.query('SELECT id, title, image_url FROM books LIMIT 5');

    console.log('\n📚 Book Images:');
    console.table(books);

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

checkBookImages();
