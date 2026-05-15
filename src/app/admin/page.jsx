// "use client";
// import { useQuery } from "@tanstack/react-query";
// import api from "@/providers/ReactQueryProvider.jsx/lib/axios";
// import Link from "next/link";

// export default function ProductsPage() {
//   const { data, isLoading } = useQuery(["products"], async () => {
//     const res = await api.get("/products");
//     return res.data.data;
//   });

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Products</h1>
//       <Link
//         href="/admin/products/add"
//         className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
//       >
//         Add Product
//       </Link>

//       <table className="w-full bg-white rounded shadow">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="p-2">Name</th>
//             <th className="p-2">Category</th>
//             <th className="p-2">Variants</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((product) => (
//             <tr key={product._id} className="border-b">
//               <td className="p-2">{product.name}</td>
//               <td className="p-2">{product.categoryId}</td>
//               <td className="p-2">
//                 {product.variants.map((v) => v.name).join(", ")}
//               </td>
//               <td className="p-2">
//                 <Link
//                   href={`/admin/products/${product._id}/edit`}
//                   className="text-blue-600 mr-2"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   className="text-red-600"
//                   onClick={async () => {
//                     await api.delete(`/products/${product._id}`);
//                     window.location.reload();
//                   }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
