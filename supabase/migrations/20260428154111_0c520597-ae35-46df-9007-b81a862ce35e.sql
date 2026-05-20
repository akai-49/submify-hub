
-- 1. Fix submissions INSERT policy to constrain user_id
DROP POLICY IF EXISTS "Anyone can submit" ON public.submissions;

CREATE POLICY "Anyone can submit"
ON public.submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  user_id IS NULL OR user_id = auth.uid()
);

-- 2. Revoke EXECUTE on has_role from anon and public to prevent unauthenticated probing
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM public;

-- 3. Add explicit admin-only UPDATE policy on user_roles to block any role updates by non-admins
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
