const Loader = ({ label = 'Loading...' }) => (
  <div className="loader" role="status">
    <span className="spinner" />
    <span>{label}</span>
  </div>
)

export default Loader
