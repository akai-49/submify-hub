import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Download, Inbox, Search, ShieldCheck, Trash2, Users } from "lucide-react";
import { format, subDays, startOfDay } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — FormFlow" }] }),
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      throw redirect({ to: "/login" });
    }
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: AdminPage,
});

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

type ProfileRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
};

type RoleRow = { user_id: string; role: "admin" | "user" };

const PAGE_SIZE = 20;

function AdminPage() {
  const { user, isAdmin, loading: authLoading, refreshRole } = useAuth();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate({ to: "/dashboard" });
    }
  }, [user, isAdmin, authLoading, navigate]);

  const loadData = async () => {
    setLoading(true);
    const [subRes, profRes, roleRes] = await Promise.all([
      supabase.from("submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, full_name, email, created_at"),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    setSubmissions(subRes.data ?? []);
    setProfiles(profRes.data ?? []);
    setRoles((roleRes.data ?? []) as RoleRow[]);
    setLoading(false);
  };

  useEffect(() => {
    if (user && isAdmin) loadData();
  }, [user, isAdmin]);

  // Stats
  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = subDays(now, 7);
    const monthAgo = subDays(now, 30);
    return {
      total: submissions.length,
      week: submissions.filter((s) => new Date(s.created_at) >= weekAgo).length,
      month: submissions.filter((s) => new Date(s.created_at) >= monthAgo).length,
      unique: new Set(submissions.map((s) => s.email.toLowerCase())).size,
    };
  }, [submissions]);

  // Chart: submissions over last 30 days
  const lineData = useMemo(() => {
    const days: { date: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const day = startOfDay(subDays(new Date(), i));
      const next = startOfDay(subDays(new Date(), i - 1));
      const count = submissions.filter((s) => {
        const d = new Date(s.created_at);
        return d >= day && d < next;
      }).length;
      days.push({ date: format(day, "MMM d"), count });
    }
    return days;
  }, [submissions]);

  // Chart: by day of week
  const dowData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = [0, 0, 0, 0, 0, 0, 0];
    submissions.forEach((s) => {
      counts[new Date(s.created_at).getDay()]++;
    });
    return days.map((d, i) => ({ day: d, count: counts[i] }));
  }, [submissions]);

  // Filtering + pagination
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return submissions;
    return submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.message.toLowerCase().includes(q),
    );
  }, [submissions, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const exportCSV = () => {
    const header = ["id", "name", "email", "phone", "message", "created_at"];
    const rows = filtered.map((s) =>
      [s.id, s.name, s.email, s.phone ?? "", s.message.replace(/"/g, '""'), s.created_at]
        .map((v) => `"${String(v).replace(/\n/g, " ")}"`)
        .join(","),
    );
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteSubmission = async (id: string) => {
    const { error } = await supabase.from("submissions").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
      return;
    }
    toast.success("Submission deleted");
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleAdmin = async (uid: string, makeAdmin: boolean) => {
    if (makeAdmin) {
      const { error } = await supabase.from("user_roles").insert({ user_id: uid, role: "admin" });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Promoted to admin");
    } else {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", uid).eq("role", "admin");
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Admin role removed");
    }
    if (uid === user?.id) await refreshRole();
    loadData();
  };

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-8 w-48" />
        </div>
      </div>
    );
  }

  const adminUserIds = new Set(roles.filter((r) => r.role === "admin").map((r) => r.user_id));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin</h1>
            <p className="text-sm text-muted-foreground">Manage submissions and users</p>
          </div>
        </div>

        {/* Stat cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total", value: stats.total },
            { label: "Last 7 days", value: stats.week },
            { label: "Last 30 days", value: stats.month },
            { label: "Unique submitters", value: stats.unique },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{loading ? "—" : s.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mb-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 font-semibold text-foreground">Submissions — last 30 days</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 font-semibold text-foreground">By day of week</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <Tabs defaultValue="submissions">
          <TabsList>
            <TabsTrigger value="submissions">
              <Inbox className="mr-1.5 h-4 w-4" /> Submissions
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="mr-1.5 h-4 w-4" /> Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="mt-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, message…"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" onClick={exportCSV}>
                <Download className="mr-1.5 h-4 w-4" /> Export CSV
              </Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Message</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                          Loading…
                        </td>
                      </tr>
                    ) : pageItems.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                          No submissions found.
                        </td>
                      </tr>
                    ) : (
                      pageItems.map((s) => (
                        <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                          <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{s.email}</td>
                          <td className="max-w-md truncate px-4 py-3 text-muted-foreground">{s.message}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                            {format(new Date(s.created_at), "MMM d, yyyy")}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="icon" onClick={() => deleteSubmission(s.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {filtered.length > PAGE_SIZE && (
              <div className="mt-4 flex items-center justify-between text-sm">
                <p className="text-muted-foreground">
                  Page {page} of {totalPages} · {filtered.length} total
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Joined</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                          No users yet.
                        </td>
                      </tr>
                    ) : (
                      profiles.map((p) => {
                        const isAdminUser = adminUserIds.has(p.id);
                        return (
                          <tr key={p.id} className="border-b border-border last:border-0">
                            <td className="px-4 py-3 font-medium text-foreground">{p.full_name || "—"}</td>
                            <td className="px-4 py-3 text-muted-foreground">{p.email}</td>
                            <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                              {format(new Date(p.created_at), "MMM d, yyyy")}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={
                                  isAdminUser
                                    ? "inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                                    : "inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                                }
                              >
                                {isAdminUser ? "Admin" : "User"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleAdmin(p.id, !isAdminUser)}
                                disabled={p.id === user.id && isAdminUser}
                              >
                                {isAdminUser ? "Remove admin" : "Make admin"}
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              You can't remove your own admin role to avoid lockout.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
