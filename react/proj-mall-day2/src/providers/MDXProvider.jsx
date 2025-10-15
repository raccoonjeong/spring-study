import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "@/components/CodeBlock";

const H1 = (p) => (
  <h1 className="text-3xl font-bold mt-3 mb-6 border-b pb-6" {...p} />
);
const H2 = (p) => <h2 className="text-2xl font-semibold pt-6 my-6" {...p} />;
const P = (p) => <p className="leading-7 my-3" {...p} />;
const A = (p) => <a className="text-primary underline" {...p} />;
const Hr = (p) => <hr className="my-8 border-t border-stone-200" {...p} />;

export default function AppMDXProvider({ children }) {
  return (
    <MDXProvider
      components={{
        h1: H1,
        h2: H2,
        p: P,
        a: A,
        pre: (props) => <CodeBlock {...props} />,
        hr: Hr,
      }}
    >
      {children}
    </MDXProvider>
  );
}
