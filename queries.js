// Task 2: Basic CRUD Operations

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// 2. Find books published after a certain year (e.g., after 1950)
db.books.find({ published_year: { $gt: 1950 } })

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" })

// 4. Update the price of a specific book (e.g., "The Hobbit")
db.books.updateOne({ title: "The Hobbit" }, { $set: { price: 16.99 } })

// 5. Delete a book by its title (e.g., "Animal Farm")
db.books.deleteOne({ title: "Animal Farm" })


// Task 3: Advanced Queries

// 1. Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// 2. Projection: return only title, author, and price fields
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 })

// 3. Sort books by price ascending
db.books.find().sort({ price: 1 })

// 4. Sort books by price descending
db.books.find().sort({ price: -1 })

// 5. Pagination: 5 books per page
// Page 1
db.books.find().skip(0).limit(5)

// Page 2
db.books.find().skip(5).limit(5)


// Task 4: Aggregation Pipeline

// 1. Calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" }
    }
  }
])

// 2. Find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      total_books: { $sum: 1 }
    }
  },
  { $sort: { total_books: -1 } },
  { $limit: 1 }
])

// 3. Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      total_books: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])


// Task 5: Indexing

// 1. Create an index on the title field
db.books.createIndex({ title: 1 })

// 2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// 3. Use explain() to analyze performance (e.g., searching by title)
db.books.find({ title: "The Great Gatsby" }).explain("executionStats")
