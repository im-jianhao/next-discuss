export default async function PostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  return (
    <div className="mx-auto px-6 max-w-[1024px]">
      <div className="flex w-full flex-row relative flex-nowrap items-center justify-between">
        <h3>Top Posts {postId}</h3>
      </div>
    </div>
  );
}
