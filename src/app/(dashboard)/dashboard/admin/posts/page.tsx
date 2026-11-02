import ApiButton from "@/components/dashboard/ApiButton";
import { FormDialog, type Field } from "@/components/dashboard/ApiForm";
import { Empty, LoadError, PageHeader, Panel, Table, shortDate } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Post } from "@/types/dashboard";

const fields: Field[] = [
  { name: "title", label: "Title", required: true, full: true },
  { name: "content", label: "Content", type: "textarea", required: true },
  { name: "tags", label: "Tags", help: "Separate with commas" },
  { name: "isFeatured", label: "Featured", type: "checkbox" },
];

export default async function AdminPosts() {
  const res = await apiGet<Post[]>("/post");
  if (!res.data) return <LoadError message={res.message} />;
  return (
    <>
      <PageHeader title="Posts" action={<FormDialog trigger="New post" title="New post" variant="primary" method="POST" path="/post" fields={fields} submitLabel="Publish" />} />
      <Panel>
        {res.data.length ? (
          <Table head={["Title", "Author", "Views", "Date", ""]}>
            {res.data.map((p) => (
              <tr key={p.id}>
                <td className="max-w-72 truncate font-medium text-slate-800">{p.title}</td>
                <td>{p.author?.name}</td>
                <td className="tabular-nums">{p.views}</td>
                <td className="whitespace-nowrap text-slate-500">{shortDate(p.createdAt)}</td>
                <td>
                  <span className="flex justify-end gap-1.5">
                    <FormDialog trigger="Edit" title="Edit post" method="PUT" path={`/post/${p.id}`} fields={fields} submitLabel="Save" initial={{ title: p.title, content: p.content, tags: p.tags.join(", "), isFeatured: p.isFeatured }} />
                    <ApiButton method="DELETE" path={`/post/${p.id}`} variant="danger" confirm="Delete?">Delete</ApiButton>
                  </span>
                </td>
              </tr>
            ))}
          </Table>
        ) : <Empty title="No posts yet" />}
      </Panel>
    </>
  );
}
