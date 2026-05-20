
-- Restrict execute on handle_new_user (only the auth trigger should call it)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
-- has_role is intentionally callable by authenticated users for use in RLS predicates; this is the standard Supabase pattern.
