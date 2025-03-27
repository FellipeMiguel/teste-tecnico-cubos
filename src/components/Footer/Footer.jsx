const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer
      className="flex items-center justify-center py-4"
      style={{
        backgroundColor: "rgba(var(--background), 0.5)",
        borderColor: "rgb(var(--border))",
      }}
    >
      <p className="text-white lg:text-base text-sm">
        <span>{year}</span> &#169; Todos os direitos reservados a{" "}
        <span className="font-bold">Cubos Movies</span>
      </p>
    </footer>
  );
};

export default Footer;
