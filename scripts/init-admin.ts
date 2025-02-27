import { supabase, seedAdminUser } from '@/lib/supabase';

async function main() {
  console.log('🚀 Initializing admin user...');
  
  try {
    const result = await seedAdminUser();
    if (result.success) {
      console.log('✅ Admin user is ready to use');
    } else {
      console.error('❌ Failed to initialize admin user:', result.error);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  } finally {
    process.exit(0);
  }
}

main();