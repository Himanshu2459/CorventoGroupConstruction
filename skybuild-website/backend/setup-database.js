const { Pool } = require('pg');
require('dotenv').config();

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function setupDatabase() {
    try {
        console.log('🔄 Connecting to database...');
        const client = await pool.connect();
        console.log('✅ Connected to database successfully!');
        
        console.log('🔄 Creating Contacts table...');
        
        // Create Contacts table
        await client.query(`
            CREATE TABLE IF NOT EXISTS "Contacts" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                email VARCHAR(255) NOT NULL,
                area VARCHAR(255),
                work VARCHAR(255),
                project_type VARCHAR(100),
                budget VARCHAR(100),
                detailed_location TEXT,
                additional_details TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        console.log('✅ Contacts table created successfully!');
        
        // Check if table exists
        const result = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'Contacts';
        `);
        
        if (result.rows.length > 0) {
            console.log('✅ Verified: Contacts table exists in database');
            
            // Show table structure
            const columns = await client.query(`
                SELECT column_name, data_type, character_maximum_length
                FROM information_schema.columns
                WHERE table_name = 'Contacts'
                ORDER BY ordinal_position;
            `);
            
            console.log('\n📋 Table Structure:');
            console.log('-------------------');
            columns.rows.forEach(col => {
                console.log(`  - ${col.column_name}: ${col.data_type}${col.character_maximum_length ? `(${col.character_maximum_length})` : ''}`);
            });
        }
        
        client.release();
        await pool.end();
        
        console.log('\n🎉 Database setup completed successfully!');
        console.log('📝 You can now use the registration form.');
        
    } catch (error) {
        console.error('❌ Error setting up database:', error.message);
        console.error('\nFull error:', error);
        process.exit(1);
    }
}

// Run the setup
setupDatabase();
