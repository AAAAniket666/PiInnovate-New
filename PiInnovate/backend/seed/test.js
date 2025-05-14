const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...'.yellow);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB Connected'.cyan);
    console.log('Database name:', conn.connection.name);
    console.log('Host:', conn.connection.host);
    
    // Test if we can create a model
    const TestSchema = new mongoose.Schema({
      name: String
    });
    
    const TestModel = mongoose.model('Test', TestSchema);
    
    const testDoc = new TestModel({
      name: 'Test Document'
    });
    
    await testDoc.save();
    console.log('Test document saved successfully!'.green);
    
    // Clean up
    await TestModel.deleteMany({});
    console.log('Test data cleaned up'.yellow);
    
    mongoose.connection.close();
    console.log('Connection closed'.yellow);
  } catch (error) {
    console.error('Error:', error.message.red);
    console.error('Stack:', error.stack.grey);
    process.exit(1);
  }
}

testConnection();
