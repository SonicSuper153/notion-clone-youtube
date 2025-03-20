import { auth } from "@clerk/nextjs/server"

function DocLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  auth.protect(); // Ensure auth() is correctly used

  return <div>{children}</div>;
}

export default DocLayout;

