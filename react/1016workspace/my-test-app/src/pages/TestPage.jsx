import { Link } from "react-router-dom";

function NavBar() {
  const navItems = [
    { title: "Use Cases" },
    { title: "Pricing", url: "/pricing" },
    { title: "Support", url: "/support" },
  ];
  return (
    <div className="flex space-x-4 mx-auto max-w-3xl bg-green-50">
      {navItems.map((item) => (
        <div key={item.title} className="font-bold text-purple-500">
          {item.title}
        </div>
      ))}
    </div>
  );
}

function Header() {
  return (
    <div className="bg-yellow-50 py-2">
      <NavBar />
    </div>
  );
}

function Footer() {
  const footerNavGroups = [
    {
      title: "Use Cases",
      items: [
        {
          title: "For Designers",
          url: "/",
        },
        {
          title: "For Designers",
          url: "/",
        },
        {
          title: "For Designers",
          url: "/",
        },
        {
          title: "For Designers",
          url: "/",
        },
        {
          title: "For Designers",
          url: "/",
        },
        {
          title: "For Designers",
          url: "/",
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          title: "For Designers",
          url: "/",
        },
      ],
    },
    {
      title: "Resources",
    },
    {
      title: "Resources",
    },
    {
      title: "Resources",
    },
  ];
  return (
    <div className="bg-[#10284B] text-white py-16">
      <Container>
        <div className="grid grid-cols-4 gap-4 ">
          {footerNavGroups.map((group) => (
            <div>
              <div key={group.title} className="font-bold">
                {group.title}
              </div>
              <div>
                {group?.items &&
                  group?.items?.map((item) => (
                    <div key={item.title}>{item.title}</div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

function Container({ children }) {
  return <div className="mx-auto w-full max-w-5xl">{children}</div>;
}

function Sidebar() {
  return <div>Sidebar</div>;
}

function Section({ title, subtitle, moreUrl, children }) {
  return (
    <div>
      <div className="flex">
        <div className="flex-grow">
          <div className="font-bold text-3xl">{title}</div>
          <div>{subtitle}</div>
        </div>
        <Link to={moreUrl} className="underline text-purple-400">
          VIEW ALL
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">{children}</div>
    </div>
  );
}

function Card({ title }) {
  return <div className="bg-stone-200 min-h-[100px]">{title || "Title"}</div>;
}

export default function TestPage() {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <div className="flex py-16">
            <div className="w-[300px]">
              <Sidebar />
            </div>
            <div className="flex-grow">
              <Section
                title="New in the Library"
                subtitle="Newly added accessibility resources, guides, and more."
                moreUrl="/"
              >
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </Section>

              <Section
                title="New in the Library"
                subtitle="Newly added accessibility resources, guides, and more."
                moreUrl="/"
              >
                <Card />
                <Card />
                <Card />
              </Section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
