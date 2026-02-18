# Challenges faced & Solutions

During the development of this project, I encountered a few challenges — especially since I was new to Supabase and its backend-as-a-service architecture. Below are two key problems I faced and how I solved them.

## 1. Understanding Supabase Authenticaion & RSL

comming from a traditional backend setup (Node.js + MongoDB), Supbase workflow was initial confusing, Even after loggin with Google OAuth, my database queries are failing

The main reason was **Row Level Security (RLS)** policies on the `bookmarks` table. By default, Supabase blocks all database access unless you explicitly define policies that allow specific actions (SELECT, INSERT, UPDATE, DELETE) for authenticated users.

**Solution:**
I learned to define RLS policies using SQL. For example, to allow any authenticated user to add new bookmarks, I added the following policy:

```sql
alter policy "Enable intsert for users baesd on User Id"
on "public"."bookmaks"
to authenticated
with check (
  ((SELECT auth.uid() as uid) = user_id)
)
```

This single line of SQL fixed all my "permission denied" errors and taught me the importance of security-first design in Supabase.

## 2. Realtime Subscriptions

I wanted the bookmark list to update instantly when another user added a link, without needing to refresh the page. For this, I used Supabase Realtime subscriptions.

**Solution:**
I subscribed to the `bookmarks` table using the `channel.on()` method. This allowed me to listen for any new inserts in real-time. When a new bookmark was added, the `handleNewBookmark` function would automatically update the local state, causing the UI to re-render instantly.

```javascript
const channel = supabase
  .channel('bookmark-realtime')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'bookmarks' },
    (payload) => {
      if (payload.eventType === 'INSERT') {
        setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
      }
      if (payload.eventType === 'UPDATE') {
        setBookmarks((prev) =>
          prev.map((b) =>
            b.id === (payload.new as Bookmark).id
              ? (payload.new as Bookmark)
              : b
          )
        );
      }
      if (payload.eventType === 'DELETE') {
        setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
      }
    }
  )
  .subscribe();
```

This feature made the app feel much more dynamic and responsive, similar to modern chat applications.
