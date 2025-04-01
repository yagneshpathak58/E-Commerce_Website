import MainLayout from "@/layout/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold">Not Found</h1>
      <p className="mt-2 text-gray-600">This page could not be found.</p>
    </MainLayout>
  );
};

export default NotFound;