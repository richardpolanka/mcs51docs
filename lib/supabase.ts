import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Section = {
  id: string;
  title: string;
  description: string;
  order: number;
  slug: string;
};

export type CodeExample = {
  id: string;
  title: string;
  code: string;
  description?: string;
  section_id: string;
  order: number;
};

export type AddressingMode = {
  id: string;
  title: string;
  syntax: string;
  description: string;
  example: string;
  order: number;
};

export type Pattern = {
  id: string;
  title: string;
  code: string;
  description: string;
  order: number;
};

export type Timing = {
  id: string;
  category: string;
  details: string[];
  order: number;
};

// Function to seed the admin user (you can call this from a setup script or on app initialization)
export async function seedAdminUser() {
  try {
    // Check if the user already exists
    const { data: existingUsers, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin');

    if (fetchError) {
      console.error('Error checking existing user:', fetchError);
      return { success: false, error: fetchError };
    }

    // If the user doesn't exist, create it
    if (!existingUsers || existingUsers.length === 0) {
      const { data, error } = await supabase.auth.signUp({
        email: 'admin@mcs51docs.cz',
        password: 'admin123',
      });

      if (error) {
        console.error('Error creating admin user:', error);
        return { success: false, error };
      }

      console.log('Admin user created successfully');
      return { success: true, user: data.user };
    }

    console.log('Admin user already exists');
    return { success: true, user: existingUsers[0] };
  } catch (error) {
    console.error('Error seeding admin user:', error);
    return { success: false, error };
  }
}

export async function getSections() {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .order('"order"');
  
  if (error) {
    console.error('Error fetching sections:', error);
    return [];
  }
  
  return data as Section[];
}

export async function getSectionBySlug(slug: string) {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error(`Error fetching section with slug ${slug}:`, error);
    return null;
  }
  
  return data as Section;
}

export async function getAddressingModes() {
  const { data, error } = await supabase
    .from('addressing_modes')
    .select('*')
    .order('"order"');
  
  if (error) {
    console.error('Error fetching addressing modes:', error);
    return [];
  }
  
  return data as AddressingMode[];
}

export async function getPatterns() {
  const { data, error } = await supabase
    .from('patterns')
    .select('*')
    .order('"order"');
  
  if (error) {
    console.error('Error fetching patterns:', error);
    return [];
  }
  
  return data as Pattern[];
}

export async function getCodeExamples() {
  const { data, error } = await supabase
    .from('code_examples')
    .select('*')
    .order('"order"');
  
  if (error) {
    console.error('Error fetching code examples:', error);
    return [];
  }
  
  return data as CodeExample[];
}

export async function getTiming() {
  const { data, error } = await supabase
    .from('timing')
    .select('*')
    .order('"order"');
  
  if (error) {
    console.error('Error fetching timing info:', error);
    return [];
  }
  
  return data as Timing[];
}

export async function createAddressingMode(addressingMode: Omit<AddressingMode, 'id'>) {
  const { data, error } = await supabase
    .from('addressing_modes')
    .insert(addressingMode)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating addressing mode:', error);
    return null;
  }
  
  return data;
}

export async function updateAddressingMode(id: string, updates: Partial<AddressingMode>) {
  const { data, error } = await supabase
    .from('addressing_modes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating addressing mode ${id}:`, error);
    return null;
  }
  
  return data;
}

export async function deleteAddressingMode(id: string) {
  const { error } = await supabase
    .from('addressing_modes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting addressing mode ${id}:`, error);
    return false;
  }
  
  return true;
}

export async function createPattern(pattern: Omit<Pattern, 'id'>) {
  const { data, error } = await supabase
    .from('patterns')
    .insert(pattern)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating pattern:', error);
    return null;
  }
  
  return data;
}

export async function updatePattern(id: string, updates: Partial<Pattern>) {
  const { data, error } = await supabase
    .from('patterns')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating pattern ${id}:`, error);
    return null;
  }
  
  return data;
}

export async function deletePattern(id: string) {
  const { error } = await supabase
    .from('patterns')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting pattern ${id}:`, error);
    return false;
  }
  
  return true;
}

export async function createCodeExample(example: Omit<CodeExample, 'id'>) {
  const { data, error } = await supabase
    .from('code_examples')
    .insert(example)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating code example:', error);
    return null;
  }
  
  return data;
}

export async function updateCodeExample(id: string, updates: Partial<CodeExample>) {
  const { data, error } = await supabase
    .from('code_examples')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating code example ${id}:`, error);
    return null;
  }
  
  return data;
}

export async function deleteCodeExample(id: string) {
  const { error } = await supabase
    .from('code_examples')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting code example ${id}:`, error);
    return false;
  }
  
  return true;
}