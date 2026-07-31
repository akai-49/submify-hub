-- 1. Restore EXECUTE on has_role for `authenticated`.
--
-- Migration 20260428154134 revoked it. Postgres checks EXECUTE privilege when it
-- *initialises* an expression, not when it evaluates one, so a revoked function
-- referenced anywhere in an OR'd RLS qual fails the whole query — short-circuiting
-- does not save you. Every table here has at least one admin policy calling
-- has_role, so an authenticated SELECT on submissions/profiles/user_roles errored
-- with "permission denied for function has_role" instead of returning rows.
-- Effect: dashboards were always empty and /admin was unreachable for everyone.
--
-- anon and PUBLIC stay revoked (migration 20260428154111) so unauthenticated
-- clients still cannot probe roles via PostgREST RPC.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- 2. Enforce the submission limits at the trust boundary.
--
-- submissionSchema (src/lib/submission-schema.ts) runs in the browser and anyone
-- holding the publishable key can POST straight to PostgREST, bypassing it. These
-- constraints mirror that schema so the bounds actually hold.
ALTER TABLE public.submissions
  ADD CONSTRAINT submissions_name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT submissions_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT submissions_email_format CHECK (email LIKE '%_@_%._%'),
  ADD CONSTRAINT submissions_phone_len CHECK (phone IS NULL OR char_length(phone) <= 30),
  ADD CONSTRAINT submissions_message_len CHECK (char_length(message) BETWEEN 1 AND 2000);
