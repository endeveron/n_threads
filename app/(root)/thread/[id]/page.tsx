import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { fetchUser } from '@/lib/actions/user.actions';
import ThreadCard from '@/components/cards/ThreadCard';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import Reply from '@/components/forms/Reply';

export const revalidate = 0;

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  if (!params.id) return null;

  // Get user auth data from clerk
  const authUser = await currentUser();
  if (!authUser) return null;
  const authUserId = authUser.id.toString();

  // Fetch user data from db
  const user = await fetchUser(authUserId);
  if (!user) throw new Error('Error fetching user data.');
  if (!user.onboarded) redirect('/onboarding');
  const userObjectId = user._id.toString();

  // Fetch the main thread data from db
  const thread = await fetchThreadById(params.id);

  return (
    <div className="thread-details page">
      <ThreadCard
        id={thread._id}
        author={thread.author}
        content={thread.text}
        community={thread.community}
        replies={thread.children}
        likes={thread.likes}
        parent={thread.parent}
        createdAt={thread.createdAt}
        userId={authUserId}
        userObjectId={userObjectId}
        disableTextLink
      />

      <div className="thread-details_reply mt-8">
        <Reply
          threadId={params.id}
          userImg={user.image}
          userObjectId={userObjectId}
        />
      </div>

      <div className="thread-details_reply-list mt-10">
        {thread.children.map((reply: any) => (
          <ThreadCard
            id={reply._id}
            author={reply.author}
            content={reply.text}
            community={reply.community}
            replies={reply.children}
            likes={reply.likes}
            parent={reply.parent}
            createdAt={reply.createdAt}
            isReply
            userId={authUserId} // Clerk user id
            userObjectId={userObjectId}
            key={reply._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
