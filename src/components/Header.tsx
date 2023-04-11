interface Props {
  title: string;
}
const Header = (title: Props) => {
  return <h1>{title.title}</h1>;
};

export default Header;
