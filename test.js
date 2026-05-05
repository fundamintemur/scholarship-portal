const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ovygikvjrmfbvzrdngpr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdpa3Zqcm1mYnZ6cmRuZ3ByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MzkxMzgsImV4cCI6MjA5MzExNTEzOH0.1KFS3bP-6APUpDp8TUashTBl4buGxi6f0djVdVFaUDk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const email = `test_app_${Date.now()}@example.com`;
  const password = 'Password123!';
  
  console.log(`Signing up with ${email}...`);
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: 'Test User'
      }
    }
  });

  if (signUpError) {
    console.error('Sign up error:', signUpError.message);
    return;
  }

  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    console.error('Sign in error:', signInError.message);
    return;
  }

  console.log('Logged in. User ID:', signInData.user.id);

  console.log('Trying to insert application...');
  const { data: appData, error: appError } = await supabase
    .from('applications')
    .insert({
      user_id: signInData.user.id,
      university: 'Test Uni',
      gpa: 3.5,
      status: 'pending',
    })
    .select();

  if (appError) {
    console.error('Application Insert Error:', appError);
  } else {
    console.log('Application inserted successfully!', appData);
  }
}

test();
