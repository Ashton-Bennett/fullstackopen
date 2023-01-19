import { filterAnecdotes } from "../reducers/filterReducer";
import { connect } from "react-redux";
const Filter = (props) => {
  const handleChange = (event) => {
    props.filterAnecdotes(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filterAnecdotes,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
