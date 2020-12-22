import Navbar from "./Navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
}
