// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { EMAIL_CONFIG } from '../../../src/utils/auth/email.config';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  email: string;
  code: string;
}

interface DenoEnv {
  get(key: string): string | undefined;
}

declare const Deno: {
  env: DenoEnv;
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get request body
    const { email, code }: EmailRequest = await req.json();

    if (!email || !code) {
      throw new Error('Email and code are required');
    }

    // Send email using Supabase email service
    const { error: emailError } = await supabaseClient.auth.admin.sendRawEmail({
      email,
      subject: EMAIL_CONFIG.TEMPLATES.VERIFICATION.SUBJECT,
      html: EMAIL_CONFIG.TEMPLATES.VERIFICATION.HTML(code),
    });

    if (emailError) {
      throw emailError;
    }

    return new Response(
      JSON.stringify({ message: 'Verification code sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
}); 