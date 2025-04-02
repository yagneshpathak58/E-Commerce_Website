const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-6 w-full">
      <div className="container mx-auto px-4">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
