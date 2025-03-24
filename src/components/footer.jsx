const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="flex items-center justify-center p-4">
      <p className="text-white">
        <span>{year}</span> &#169; Todos os direitos reservados a{" "}
        <span className="font-bold">Cubos Movies</span>
      </p>
    </footer>
  );
};

export default Footer;
