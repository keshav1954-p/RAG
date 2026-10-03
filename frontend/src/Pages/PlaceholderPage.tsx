import { Icon } from "../components/Icon";
import { PageHeader } from "../components/PageHeader";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <section className="card empty-section">
        <Icon name="spark" size={24} />
        <h2>Ready when you are</h2>
        <p>
          This workspace view is ready for future backend support.
        </p>
      </section>
    </>
  );
}
